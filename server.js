const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
/*let corsOptions = {
    origin : 'http://localhost:3000',
    origin: 'http://localhost:8080',
    credentials: true
}*/


app.use(express.static(__dirname + '/build'));
app.use(express.urlencoded({extended: true}))
app.use(cors());    // cors 미들웨어 추가



const MongoClient = require('mongodb').MongoClient;


var db;

MongoClient.connect('mongodb://admin:qwer1234@cluster0-shard-00-00.51jz7.mongodb.net:27017,cluster0-shard-00-01.51jz7.mongodb.net:27017,cluster0-shard-00-02.51jz7.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-iwwci8-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useUnifiedTopology: true }, function(에러, client){
        if (에러) return console.log(에러);
        db = client.db('kiosk');
    })



const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
let globalCount = 0;
let date = new Date();

io.on("connect", socket => {
    /*console.log("connect client by Socket.io");*/

    socket.on("payButton", req => {
        /*console.log("pay")
        console.log(req);*/
        io.emit("payRespond", req)
    })

    socket.on("payCash", req => {
        /*console.log("cash")
        console.log(req);*/
        io.emit("payCash", req)
    })

    socket.on("payCard", req => {
        /*console.log("card")
        console.log(req);*/
        io.emit("payCard", req)
    })
});

http.listen(8080, function () {
    console.log('listening on 8080')
});



/* Counter */

/* 주문 완료시 3초 후에 새로고침 */
app.post('/order', (req, res) => {
    setTimeout(() => {
        res.redirect('./order/0');
    }, 3000)
})

/* 메뉴 제작 완료 후 매출 현황에 기록하는 기능 */
app.post('/makeComp', (req, res) => {
    var menuTitle = ['커피', '버블티', '프라페', '스무디', '에이드', '주스', '차', '디저트'];

    let jsonData = [];
    let dataSet = new Object();
    let jsonResult = null;

    dataSet.month = (date.getMonth() + 1);
    dataSet.day = date.getDate();
    dataSet.hour = date.getHours();
    dataSet.minute = date.getMinutes();

    jsonData.push(dataSet);
    console.log(jsonData[0]);

    console.log("makeComp");
    console.log(req.body);

    /* 주문 메뉴가 1가지 일 때 */
    if(typeof (req.body.title) == "string") {
        /* 메뉴 종류 */
        let sMenu;
        let orderMenu = req.body.title;
        let orderCount = req.body.count;

        /* 메뉴 종류 삽입 */
        for(let i = 0; i <= 8; i++) {
            if(i == parseInt(req.body.menuIndex)) {
                sMenu = menuTitle[i];
            }
        }

        console.log("1개");
        console.log((req.body.title))

        /* 주문 추가 */
        db.collection('counter').findOne({ name : '카운터'}, (err, cntRes) => {
            let totalCount = cntRes.count;

            /* 메뉴별 매출 추가 */
            db.collection('rev_menu').findOne({ 메뉴이름 : orderMenu }, (err, revRes) => {

                /* 중복되는 메뉴가 있을 때 */
                if(revRes != null) {
                    console.log("중복됨")
                    db.collection('rev_menu').updateOne({ 메뉴이름 : orderMenu },
                        {
                            $set: {
                                수량: parseInt(revRes.수량) + parseInt(req.body.count),
                                가격: parseInt(revRes.가격) + parseInt(req.body.price),
                            }
                        })
                }
                /* 중복되는 메뉴가 없을 때 */
                else {
                    console.log("중복없음")
                    console.log(totalCount)
                    db.collection('rev_menu').insertOne({
                            _id : ( totalCount ), 메뉴이름 : req.body.title,
                            수량 : parseInt(req.body.count), 가격 : parseInt(req.body.price),
                        },
                        (err, comp) => { if(err) return console.log(err) })
                }
                singleOrder(req, sMenu);
            })

            /* id 값을 1 증가시키는 함수 */
            CountInc();

            db.collection('rev_month').findOne({ 날짜 : (date.getMonth() + 1) }, (err, monRes) => {
                db.collection('rev_month').updateOne({ 날짜 : (date.getMonth() + 1) },
                    {
                        $set: {
                            수량: parseInt(monRes.수량) + parseInt(req.body.count),
                            가격: parseInt(monRes.가격) + parseInt(req.body.price),
                            현금: req.body.payment == 0
                                    ? parseInt(monRes.현금) + 1
                                    : parseInt(monRes.현금),
                            카드: req.body.payment == 1
                                    ? parseInt(monRes.카드) + 1
                                    : parseInt(monRes.카드)
                        }
                    })
            })


            /* 일별 매출 추가 */


        })

        /* visitors 값을 1 증가시키는 함수 */
        VisInc();
    }

    /* 주문 메뉴가 2가지 이상 일 때 */
    else if (typeof (req.body.title) == "object") {
        /* 메뉴 종류 */
        var mMenu = [];
        let orderMenu = [];
        let temp = 0;
        let tempArr = [];

        /* 주문 수만큼 메뉴 종류 삽입 */
        for (let i = 0; i <= req.body.menuIndex.length; i++) {
            for (let j = 0; j <= 8; j++) {
                if (j == parseInt(req.body.menuIndex[i])) {
                    mMenu[i] = menuTitle[j];
                }
            }
        }

        for (let i = 0; i < req.body.title.length; i++) {
            orderMenu.push(req.body.title[i])
            tempArr.push(i);
        }

        console.log("2가지 이상")
        console.log("주문메뉴 : " + orderMenu)


        /* 주문 추가 */
        db.collection('counter').findOne({ name : '카운터'}, (err, cntRes) => {
            let totalCount = (cntRes.count === 0 ? 1 : cntRes.count);

            for(let index = 0; index < orderMenu.length; index++) {
                /* 메뉴별 매출 추가 */
                db.collection('rev_menu').findOne({ 메뉴이름 : orderMenu[index] }, (err, revRes) => {

                    /* 중복되는 메뉴가 있을 때 */
                    if(revRes != null) {
                        console.log("중복됨")
                        temp = (parseInt(totalCount) + parseInt(tempArr[index]))
                        console.log("totalCount : " + temp )

                        db.collection('rev_menu').updateOne({ 메뉴이름 : orderMenu[index] },
                            {
                                $set: {
                                    수량: parseInt(revRes.수량) + parseInt(req.body.count[index]),
                                    가격: parseInt(revRes.가격) + parseInt(req.body.price[index]),
                                }
                            })
                        multiOrder(req, mMenu, index, temp);
                    }
                    /* 중복되는 메뉴가 없을 때 */
                    else {
                        console.log("중복없음")
                        temp = (parseInt(totalCount) + parseInt(tempArr[index]))
                        console.log("totalCount : " + temp )

                        db.collection('rev_menu').insertOne({
                                _id : ( temp ), 메뉴이름 : req.body.title[index],
                                수량 : parseInt(req.body.count[index]), 가격 : parseInt(req.body.price[index]),
                            },
                            (err, comp) => { if(err) return console.log(err) })
                        multiOrder(req, mMenu, index, temp);
                    }
                })

                globalCount = temp;
                /* id 값을 주문 수만큼 증가시키는 함수 */
                multiCountInc(cntRes, (req.body.title.length + 1));
            }
            console.log("result : " + globalCount)
        })
/**/
        /* visitors 값을 1 증가시키는 함수 */
        VisInc();

    }

    setTimeout( () => {
        /*res.send("test")*/
        res.redirect("./AdminPage/Counter");
    }, 3000)

})

/* id값을 1 증가시켜서 DB를 업데이트하는 함수 */
function CountInc() {
    return (
        db.collection('counter').updateOne({ name : "카운터" },
            { $inc : { count : 1 }}, (err, comp) => {
                if(err) return console.log(err);
                console.log("count up")
            })
    )
}

/* id값을 주문 수만큼 증가시켜서 DB를 업데이트하는 함수 */
function multiCountInc(cntRes, num) {
    console.log("count upp")
    return (
        db.collection('counter').updateOne({ name : "카운터" },
            {
                $set: {
                    count: parseInt(cntRes.count) + parseInt( num )
                }
            })
    )
}

/* visitors값을 1 증가시켜서 DB를 업데이트하는 함수 */
function VisInc() {
    return (
        db.collection('counter').updateOne({ name : "카운터" },
            { $inc : { visitors : 1 }}, (err, comp) => {
                if(err) return console.log(err);
            })
    )
}

function singleOrder(req, sMenu) {
    db.collection('counter').findOne({ name: "카운터" }, (err, res) => {
        let totalCount = res.count;

        /* 매출 컬렉션 */
        db.collection('revenue').insertOne({
                _id : ( totalCount ), 메뉴이름 : req.body.title,
                수량 : parseInt(req.body.count), 가격 : parseInt(req.body.price),
                지불 : (req.body.payment == 0 ? "현금" : "카드"), 옵션 : (req.body.options)
            },
            (err, comp) => { if(err) return console.log(err) })
        /* 종류 추가 */
        db.collection('variety').findOne({ 종류 : sMenu }, (err, svRes) => {
            db.collection('variety').updateOne({ 종류 : sMenu },
                {
                    $set: {
                        수량: parseInt(svRes.수량) + parseInt(req.body.count),
                        가격: parseInt(svRes.가격) + parseInt(req.body.price),
                    }
                })
        })
    })
}

function multiOrder(req, mMenu, index, temp) {
    db.collection('counter').findOne({ name: "카운터" }, (err, res) => {
        let totalCount = res.count;
        console.log("temp? " + temp)
        /* 매출 컬렉션 */
        db.collection('revenue').insertOne({
                _id : ( temp ), 메뉴이름 : req.body.title[index],
                수량 : parseInt(req.body.count[index]), 가격 : parseInt(req.body.price[index]),
                지불 : (req.body.payment[index] == 0 ? "현금" : "카드"), 옵션 : req.body.options[index]
            },
            (err, comp) => { if(err) return console.log(err) })
        /* 종류 추가 */
        db.collection('variety').findOne({ 종류 : mMenu[index] }, (err, svRes) => {
            db.collection('variety').updateOne({ 종류 : mMenu[index] },
                {
                    $set: {
                        수량: parseInt(svRes.수량) + parseInt(req.body.count[index]),
                        가격: parseInt(svRes.가격) + parseInt(req.body.price[index]),
                    }
                })
        })
    })
}

/* DB Insert */
/*app.get('/dbInsert', (req, res) => {
    console.log(req)

    let bub = [
        {
            id: 0,
            title : "밀크티버블라떼",
            content : "밀크티버블라떼",
            price : 3000,
            comment : "달콤한 밀크티에 쫄깃한 젤리를 넣은 음료"
        },

        {
            id: 1,
            title : "흑당버블라떼",
            content : "흑당버블라떼",
            price : 3500,
            comment : "달콤한 흑설탕 커피에 쫄깃한 젤리를 넣은 음료"
        },

        {
            id: 2,
            title : "달고나버블라떼",
            content : "달고나버블라떼",
            price : 3500,
            comment : "커피에 달콤한 달고나와 쫄깃한 젤리를 넣은 음료"
        },

        {
            id : 3,
            title : "흑당고구마라떼",
            content : "흑당고구마라떼",
            price : 4000,
            comment : "달콤한 흑설탕 커피에 고구마를 갈아 넣은 음료"
        }];
    let fra = [
        {
        id: 0,
        title : "자바칩프라푸치노",
        content : "자바칩 프라푸치노",
        price : 3500,
        comment : "달콤한 초코음료에 생크림을 얹어 만든 시원한 음료"
        },

        {
            id: 1,
            title : "쿠앤크프라푸치노",
            content : "쿠앤크 프라푸치노",
            price : 3500,
            comment : "쿠키를 갈아넣은 음료에 생크림을 얹어 만든 시원한 음료"
        },

        {
            id: 2,
            title : "민트초코프라푸치노",
            content : "민트초코 프라푸치노",
            price : 4000,
            comment : "민트맛 초코음료에 생크림을 얹어 만든 시원한 음료"
        },

        {
            id : 3,
            title : "딸기크림프라푸치노",
            content : "딸기크림 프라푸치노",
            price : 4000,
            comment : "신선한 딸기음료에 생딸기를 얹어 만든 시원한 음료"
        },

        {
            id : 4,
            title : "녹차프라푸치노",
            content : "녹차 프라푸치노",
            price : 3500,
            comment : "신선한 녹차음료에 생크림을 얹어 만든 시원한 음료"
        }];
    let smo = [
        {
            id: 0,
            title : "플레인요거트",
            content : "플레인요거트",
            price : 3000,
            comment : "신선한 우유맛 요거트에  시원한 음료"
        },

        {
            id: 1,
            title : "딸기요거트",
            content : "딸기 요거트",
            price : 3500,
            comment : "신선한 딸기를 갈아 만든 시원한 요거트 음료"
        },

        {
            id: 2,
            title : "블루베리요거트",
            content : "블루베리 요거트",
            price : 3500,
            comment : "신선한 블루베리를 갈아 만든 시원한 요거트 음료"
        },

        {
            id : 3,
            title : "망고요거트",
            content : "망고 요거트",
            price : 3500,
            comment : "신선한 망고를 갈아 만든 시원한 요거트 음료"
        },

        {
            id : 4,
            title : "딸기바나나요거트",
            content : "딸기 바나나 요거트",
            price : 3500,
            comment : "신선한 딸기와 바나나를 갈아 만든 시원한 요거트 음료"
        },

        {
            id : 5,
            title : "망고바나나요거트",
            content : "망고 바나나 요거트",
            price : 3500,
            comment : "신선한 망고와 바나나를 갈아 만든 시원한 요거트 음료"
        },

        {
            id : 6,
            title : "애플망고크러쉬",
            content : "애플망고 크러쉬",
            price : 3000,
            comment : "신선한 애플망고를 갈아 만든 시원한 음료"
        }
    ]
    let ade = [
        {
            id: 0,
            title : "자몽라임에이드",
            content : "자몽라임 에이드",
            price : 3000,
            comment : "톡 쏘는 탄산수에 신선한 자몽과 라임을 넣은 음료"
        },

        {
            id: 1,
            title : "청포도에이드",
            content : "청포도 에이드",
            price : 3000,
            comment : "톡 쏘는 탄산수에 신선한 청포도를 넣은 음료"
        },

        {
            id: 2,
            title : "레몬에이드",
            content : "레몬 에이드",
            price : 3000,
            comment : "톡 쏘는 탄산수에 신선한 레몬을 넣은 음료"
        },

        {
            id : 3,
            title : "블루레몬에이드",
            content : "블루레몬 에이드",
            price : 3000,
            comment : "톡 쏘는 탄산수에 신선한 레몬를 넣고 색을 입힌 음료"
        },

        {
            id : 4,
            title : "유자에이드",
            content : "유자 에이드",
            price : 3000,
            comment : "톡 쏘는 탄산수에 신선한 유자를 넣은 음료"
        },

        {
            id : 5,
            title : "깔라만시에이드",
            content : "깔라만시 에이드",
            price : 3000,
            comment : "톡 쏘는 탄산수에 깔라만시를 넣은 새콤달콤한 음료"
        }
    ]
    let jui = [
        {
            id: 0,
            title : "바나나 주스",
            content : "바나나 주스",
            price : 2500,
            comment : "신선한 바나나를 직접 갈아넣은 시원한 음료"
        },

        {
            id: 1,
            title : "토마토 주스",
            content : "토마토 주스",
            price : 2500,
            comment : "신선한 토마토를 직접 갈아넣은 시원한 음료"
        },

        {
            id: 2,
            title : "키위 주스",
            content : "키위 주스",
            price : 2500,
            comment : "신선한 키위를 직접 갈아넣은 시원한 음료"
        }
    ]
    let tea = [
        {
            id: 0,
            title : "청귤차",
            content : "청귤차",
            price : 3000,
            comment : "신선한 청귤을 넣어만든 새콤달콤한 차"
        },

        {
            id: 1,
            title : "생강차",
            content : "생강차",
            price : 3000,
            comment : "신선한 생강을 넣어만든 알싸한 차"
        },

        {
            id: 2,
            title : "레몬차",
            content : "레몬차",
            price : 2500,
            comment : "신선한 레몬을 넣어만든 상큼한 차"
        },

        {
            id : 3,
            title : "자몽차",
            content : "자몽차",
            price : 2500,
            comment : "신선한 자몽을 넣어만든 새콤달콤한 차"
        },

        {
            id : 4,
            title : "유자차",
            content : "유자차",
            price : 2500,
            comment : "신선한 유자을 넣어만든 건강한 차"
        },

        {
            id : 5,
            title : "페퍼민트",
            content : "페퍼민트",
            price : 3000,
            comment : "산뜻한 페퍼민트향이 은은히 퍼지는 건강한 차"
        },

        {
            id : 6,
            title : "카모마일",
            content : "카모마일",
            price : 3000,
            comment : "산뜻한 카모마일향이 은은히 퍼지는 건강한 차"
        },

        {
            id : 7,
            title : "얼그레이",
            content : "얼그레이",
            price : 3000
        }
    ]
    let des = [
        {
            id: 0,
            title : "치즈케익",
            content : "치즈 케익 (1조각)",
            price : 4500,
            comment : "치즈의 풍미를 느낄 수 있는 달지않은 조각케익"
        },

        {
            id: 1,
            title : "티라미수케익",
            content : "티라미수 케익 (1조각)",
            price : 5000,
            comment : "커피와 치즈를 섞어 만든 달콤하고 폭신한 조각케익"
        },

        {
            id: 2,
            title : "초코크림케익",
            content : "초코크림 케익 (1조각)",
            price : 5000,
            comment : "초코크림을 잔뜩 넣어 달콤하고 폭신한 조각케익"
        },

        {
            id : 3,
            title : "플레인크로플",
            content : "플레인 크로플",
            price : 4000,
            comment : "담백하고 짭짤한 크로플에 시럽을 얹어 만든 디저트"
        },

        {
            id : 4,
            title : "아이스크림크로플",
            content : "아이스크림 크로플",
            price : 5000,
            comment : "담백하고 짭짤한 크로플에 아이스크림을 얹어 만든 디저트"
        },

        {
            id : 5,
            title : "커피콩빵",
            content : "커피콩 빵",
            price : 3500,
            comment : "신선한 원두의 향을 느낄 수 있는 원두모양 빵"
        },

        {
            id : 6,
            title : "슈크림커피콩빵",
            content : "슈크림 커피콩 빵",
            price : 4500,
            comment : "원두의 향을 느낄 수 있는 원두모양 빵에 슈크림을 넣은 디저트"
        }
    ]
    let array = [bub, fra, smo, ade, jui, tea, des]
    let collection = ['bubbleTea_data', 'frappe_data', 'smoothie_data', 'ade_data', 'juice_data', 'tea_data', 'dessert_data']


    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[i].length; j++) {
             db.collection(collection[i]).insertOne({
                     _id : ( array[i][j].id ), title : array[i][j].title,
                     content : array[i][j].content, price : array[i][j].price,
                     comment : array[i][j].comment,
                 },
                 (err, comp) => { if(comp) console.log('success') })
        }
    }



    setTimeout(() => {
        res.send('test');
    }, 300000)
})*/

/* Order */
app.get('/getCoffee', (req, res) => {

    db.collection('coffee_data').find().toArray((err, comp) => {
        console.log("comp??")
        console.log(comp)

        res.json({ comp })
    })
})

/* AdminPage */

/* 총 매출 확인 */
app.get('/getMonthRev', (req, res) => {
    let jsonArray = [];
    let data = new Object();

    db.collection('rev_month').find().toArray((err, comp) => {
        console.log("comp ?")
        /*console.log(comp)*/
        for(let i = 0; i < 12; i++) {
            data.month = comp[i].날짜
            data.revenue = comp[i].가격

            jsonArray.push(JSON.parse(JSON.stringify(data)))
        }

        console.log("jsonArray")
        console.log(jsonArray)

        if( comp != null ) {
            res.json(jsonArray);
        }
    })
})

/* 방문객 수 확인 */
app.get('/getVisitors', (req, res) => {
    db.collection('counter').find().toArray((err, comp) => {
        if(err) return err;

        if( comp != null ) {
            res.json(comp[0].visitors);
        }
    })
})

/* 지불 정보 확인 */
app.get('/getPayment', (req, res) => {
    let date = new Date();
    let payData = new Object();

    db.collection('rev_month').findOne({ 날짜 : (date.getMonth() + 1) }, (err, comp) => {
        console.log("comp")
        console.log(comp)

        payData.cash = comp.현금;
        payData.card = comp.카드;

        console.log("??")
        if(payData != null) console.log(payData)

        if(comp != null) res.json({ payData });
    })
})

/* Revenue */

/* 매출 현황 기능 */

/* revenue collecion 호출 */
app.get('/getRevenue', (req, res) => {

    db.collection('rev_menu').find().toArray((err, comp) => {
        if(err) return err;

        /* DB에 들어있는 데이터를 id값 기준으로 정렬 */
        function customSort(a, b) {
            if(a._id === b._id) { return 0 }
            return a._id > b._id ? 1 : -1;
        }
        comp.sort(customSort);

        if(comp != null) res.json({ comp });
    })
})

/* rev_variety collecion 호출 */
app.get('/getVariety', (req, res) => {

    db.collection('variety').find().toArray((err, comp) => {
        if(err) return err;

        console.log("comp")
        console.log(comp)

        if(comp != null) res.json({ comp });
    })
})

/* Setting */

/* DB 초기화 기능 */
app.delete('/dbReset', (req, res) => {

    /* counter Reset */
    db.collection('counter').updateOne({ name : "카운터" },
        { $set : { count : 1, visitors: 0 }}, (err, comp) => {
            if (err) return err;
            else console.log("counter Reset Success");
        })

    /* variety Reset */
    for(let i = 1; i <= 8; i++) {
        db.collection('variety').updateOne({ _id : i },
            { $set : { 수량 : 0, 가격 : 0 }}, (err, comp) => {
                if (err) return err;
            })
    }

    /* rev_menu Reset */
    db.collection('rev_menu').deleteMany({}, (err) => {
        if(err) return err;
        else console.log("rev_menu Reset Success");
    })

    /* rev_month Reset */
    for(let i = 1; i <= 12; i++) {
        db.collection('rev_month').updateOne({ 날짜 : i },
            { $set : { 수량 : 0, 가격: 0, 현금: 0, 카드: 0 }}, (err, comp) => {
                if (err) return err;
            })
    }

    /* revenue Reset */
    db.collection('revenue').deleteMany({}, (err) => {
        if (err) return err;
        else console.log("revenue Reset Success");
    })

    setTimeout(() => {
        res.send("Reset Success");
    }, 3000)

})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});