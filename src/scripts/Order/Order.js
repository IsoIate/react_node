/*
import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom'

import '../../css/Order/Order.css';

import MenuBar from "./MenuBar";
import MenuDisplay from "./MenuDisplay";
import MenuPagingButtons from "./MenuPagingButtons";
import OrderTable from "./OrderTable";
import Payment from "./Payment";

function Order() {
    let history = useHistory();
    let { id } = useParams();       /!* 페이지 뒤에 붙는 숫자 *!/
    let [pageNum] = useState(0);

    return (
        <div className = "order">
            <div className="body">
                {/!* 메뉴 바 모듈화 *!/}
                <MenuBar history = { history } pageNum = { pageNum } />

                {/!* 메뉴 선택 버튼 모듈화 *!/}
                <div className="container-fluid ">
                    <div className="row menuSelectDiv">
                        <MenuDisplay id = { id } history = { history } pageNum = { pageNum }/>
                    </div>
                </div>
                {/!* 음료 이동 버튼 *!/}
                <MenuPagingButtons />
            </div>

            {/!* footer *!/}
            <div className="footer">
                {/!* 주문내역 테이블 *!/}
                <OrderTable />

                {/!* 주문정보 창 *!/}
                <Payment />
            </div>
        </div>
    )
}

export default Order*/

import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import '../../css/Order/Order.css'
import logo from "../../img/cafelogo.png";
import LiveClock from "react-live-clock";
import $ from 'jquery';
import coffeeData from "../../data/coffeeData";
import bubbleTeaData from "../../data/bubbleTeaData";
import frappeData from "../../data/frappeData";
import smoothieData from "../../data/smoothieData";
import adeData from "../../data/adeData";
import juiceData from "../../data/juiceData";
import teaData from "../../data/teaData";
import dessertData from "../../data/dessertData";
import coffee0 from "../../img/coffee/americano.png";
import coffee1 from "../../img/coffee/cafelatte.png";
import coffee2 from "../../img/coffee/vanillalatte.png";
import coffee3 from "../../img/coffee/cafemoca.png";
import coffee4 from "../../img/coffee/hazelnut.png";
import coffee5 from "../../img/coffee/caramelmacchiato.png";
import coffee6 from "../../img/coffee/tiramisulatte.png";
import bubbleTea0 from "../../img/bubbleTea/milkTeaBubbleLatte.png";
import bubbleTea1 from "../../img/bubbleTea/blackSugarBubbleLatte.png";
import bubbleTea2 from "../../img/bubbleTea/dalgonaBubbleLatte.png";
import bubbleTea3 from "../../img/bubbleTea/blackSugarSweetPotatoLatte.png";
import frappe0 from "../../img/frappe/javaChipFrappe.png";
import frappe1 from "../../img/frappe/cncFrappe.png";
import frappe2 from "../../img/frappe/mintChocoFrappe.png";
import frappe3 from "../../img/frappe/strawberryCreamFrappe.png";
import frappe4 from "../../img/frappe/greenTeaFrappe.png";
import smoothie0 from "../../img/smoothie/plainYogurt.png";
import smoothie1 from "../../img/smoothie/strayberryYogurt.png";
import smoothie2 from "../../img/smoothie/blueberryYogurt.png";
import smoothie3 from "../../img/smoothie/mangoYogurt.png";
import smoothie4 from "../../img/smoothie/strawberryBananaYogurt.png";
import smoothie5 from "../../img/smoothie/mangoBananaYogurt.png";
import smoothie6 from "../../img/smoothie/appleMangoCrush.png";
import ade0 from "../../img/ade/grapefruitLimeAde.png";
import ade1 from "../../img/ade/greenGrapeAde.png";
import ade2 from "../../img/ade/lemonAde.png";
import ade3 from "../../img/ade/blueLemonAde.png";
import ade4 from "../../img/ade/citronAde.png";
import ade5 from "../../img/ade/calamansiAde.png";
import juice0 from "../../img/juice/bananaJuice.png";
import juice1 from "../../img/juice/tomatoJuice.png";
import juice2 from "../../img/juice/kiwiJuice.png";
import tea0 from "../../img/tea/blueTangerineTea.png";
import tea1 from "../../img/tea/gingerTea.png";
import tea2 from "../../img/tea/lemonTea.png";
import tea3 from "../../img/tea/grapefruiteTea.png";
import tea4 from "../../img/tea/citronTea.png";
import tea5 from "../../img/tea/peppermintTea.png";
import tea6 from "../../img/tea/chamomileTea.png";
import tea7 from "../../img/tea/earlgreyTea.png";
import dessert0 from "../../img/dessert/cheeseCake.png";
import dessert1 from "../../img/dessert/tiramisuCake.png";
import dessert2 from "../../img/dessert/chocomousseCake.png";
import dessert3 from "../../img/dessert/plainCroffle.png";
import dessert4 from "../../img/dessert/icecreamCroffle.png";
import dessert5 from "../../img/dessert/coffeeBeanBread.png";
import dessert6 from "../../img/dessert/custardCreamBread.png";
import axios from "axios";
import MenuOption from "./MenuOption";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import CashPayment from "./CashPayment";
import CardPayment from "./CardPayment";
import io from "socket.io-client";
import SizeSelect from "./MenuSelectModal/SizeSelect";
import IceSelect from "./MenuSelectModal/IceSelect";
import SyrupSelect from "./MenuSelectModal/SyrupSelect";
import PackageSelect from "./MenuSelectModal/PackageSelect";
import SimpleTemp from "./MenuSelectModal/SimpleTemp";
import SimplePackage from "./MenuSelectModal/SimplePackage";
import HelpModal from "./HelpModal";

function Order(props) {
    let [coffee, setCoffee] = useState(coffeeData);
    let [bubbleTea, setBubbleTea] = useState(bubbleTeaData);
    let [frappe, setFrappe] = useState(frappeData);
    let [smoothie, setSmoothie] = useState(smoothieData);
    let [ade, setAde] = useState(adeData);
    let [juice, setJuice] = useState(juiceData);
    let [tea, setTea] = useState(teaData);
    let [dessert, setDessert] = useState(dessertData);

    let coffeeImg = [coffee0, coffee1, coffee2, coffee3, coffee4, coffee5, coffee6];
    let bubbleTeaImg = [bubbleTea0, bubbleTea1, bubbleTea2, bubbleTea3];
    let frappeImg = [frappe0, frappe1, frappe2, frappe3, frappe4];
    let smoothieImg = [smoothie0, smoothie1, smoothie2, smoothie3, smoothie4, smoothie5, smoothie6];
    let adeImg = [ade0, ade1, ade2, ade3, ade4, ade5];
    let juiceImg = [juice0, juice1, juice2];
    let teaImg = [tea0, tea1, tea2, tea3, tea4, tea5, tea6, tea7];
    let dessertImg = [dessert0, dessert1, dessert2, dessert3, dessert4, dessert5, dessert6];

    let menuImg = [coffeeImg, bubbleTeaImg, frappeImg, smoothieImg, adeImg, juiceImg, teaImg, dessertImg ];
    let menuArray = [coffee, bubbleTea, frappe, smoothie, ade, juice, tea, dessert]

    const date = new Date();
    let history = useHistory();
    const socketClient = io("http://localhost:8080");

    let [tabChange, setTabChange] = useState(0);
    let translate = 0;
    let slideNum = 69.56 * (parseInt((menuArray[tabChange].length) / 3));

    let state = useSelector(state => state);
    let dispatch = useDispatch();
    let reducerState = state.reducer;
    let [progress ,setProgress] = useState(0);

    const [cash, setCash] = useState(false);
    const cashShow = () => setCash(true);
    const cashClose = () => setCash(false);

    const [card, setCard] = useState(false);
    const cardShow = () => setCard(true);
    const cardClose = () => setCard(false);

    const Toast = Swal.mixin({
        width: 750,
        padding: 50,
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        let setArray = [setCoffee, setBubbleTea, setFrappe, setSmoothie, setAde, setJuice, setTea, setDessert]
        let getArray = ['/getCoffee', '/getBubbleTea', '/getFrappe', '/getSmoothie', '/getAde', '/getJuice', '/getTea', '/getDessert']
        return (
            getArray.map((num, index) => {
                return (
                    axios.get(getArray[index])
                        .then((res) => {
                            setArray[index](res.data.comp)
                            /*console.log(res.data.comp)*/
                        })
                        .catch(( error )=>{ console.log( error ) })
                )
            })
        )
    }, [])


    return (
        <div className = "orderContents">
            <div className = "leftContents">
                <div className = "topContents">
                    <div className = "topLogoBox">
                        <img className = "logoImage" src = { logo }/>
                        <p> Coffee House </p>
                    </div>
                    <div className = "helpText">
                        <div className = "helpInfo">
                            <p> 주문 </p>
                            <i className="fas fa-caret-right fa-3x helpArrow"></i>
                            <p> 옵션 선택 </p>
                            <i className="fas fa-caret-right fa-3x helpArrow"></i>
                            <p> 결제 </p>
                        </div>
                        <div className = "orderProgress">
                            <div className = { progress === 2 ? "progress_pay" : "progress_order" }></div>
                        </div>
                    </div>
                </div>
                <div className = "orderBody">
                    <div className = "menuContents">
                        <div className = "menuItems">
                            <OptionDisplayModal coffee = { coffee } coffeeImg = { coffeeImg } setProgress = { setProgress }
                                                tabChange = { tabChange } menuArray = { menuArray } menuImg = { menuImg }
                                                page = { props.page }
                            />
                        </div>
                    </div>
                </div>

                <div className = "arrowBtnDiv">
                    <div className = "leftArrowBtn" onClick={() => {
                        if(translate >= -slideNum && translate < 0) {
                            /*setTranslate(translate + 69.56)*/
                            translate = translate + 69.56;
                            $('.menuItems').css('transform', 'translateX(' + (translate) + 'vw)');
                        }
                    }}>
                        <i className="fas fa-chevron-left fa-3x"></i>
                        <p> 이전 페이지 </p>
                    </div>
                    <div className = "rightArrowBtn" onClick = {() => {
                        if(translate > -slideNum  && translate <= 0) {
                            /*setTranslate(translate - 69.56)*/
                            translate = translate - 69.56;
                            $('.menuItems').css('transform', 'translateX(' + (translate) + 'vw)');
                        }
                    }}>
                        <p> 다음 페이지 </p>
                        <i className="fas fa-chevron-right fa-3x"></i>
                    </div>
                </div>
                <MenuVarietyTab setTabChange = { setTabChange } translate = { translate }
                                clickMenu = { props.helpModalState } page = { props.page } />
            </div>
            <div className = "rightContents">
                <div className = "recipe">
                    <div className = "recipeTop">
                        <div className = "recipeTitle">
                            <p> 계산대 </p>
                            <div onClick={() => {
                                Swal.fire({
                                    title: '초기화 하시겠습니까?',
                                    text: "주문 내역이 모두 삭제됩니다.",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '초기화',
                                    cancelButtonText: '취소'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        dispatch({ type: "항목초기화" })
                                    }
                                })
                            }}>
                                <div>
                                    <Button  className = "orderResetBtn btn btn-danger"> 주문 초기화 </Button>
                                </div>
                            </div>
                        </div>
                        <div className = "recipeBody">
                            {
                                reducerState != null
                                    ?   <MenuOrderCart reducerState = { reducerState } page = { props.page } menuIndex = { tabChange } />
                                    :   null
                            }
                        </div>
                    </div>
                    <div className = "recipeBottom">
                        <div className = "recipePrice">
                            <h3> 가격 </h3>
                            <TotalPrice reducerState = { reducerState } />
                        </div>
                        <div className = "recipeButtons">
                            <Button className = "cancelBtn" onClick={() => {
                                Toast.fire({
                                    icon: 'info',
                                    title: '처음 화면으로 돌아갑니다'
                                })
                                    .then((result) => {
                                        history.push('/')
                                    })
                            }}> 처음으로 </Button>
                            <Button className = "buyBtn" onClick={() => {
                                paymentSwal(reducerState, cashShow, cardShow, cashClose, cardClose, history, socketClient)
                            }}> 구매하기 </Button>
                        </div>
                    </div>
                </div>
            </div>
            {
                cash === true
                    ? <CashPayment cashShow = { cashShow } onHide = { cashClose } cashShow = { cashShow } cashClose = { cashClose } />
                    : null
            }
            {
                card === true
                    ? <CardPayment cardShow = { cardShow } onHide = { cardClose } cardShow = { cardShow } cardClose = { cardClose } />
                    : null
            }
        </div>
    )
}

/* 결제 버튼 클릭 후 기능 */
function paymentSwal(reducerState, cashShow, cardShow, cashClose, cardClose, history, socketClient) {
    let state = reducerState;
    let index = state.length;

    if(index > 0) {
        Swal.fire({
            title: '결제 방법을 선택해 주세요',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '현금',
            confirmButtonColor: '#3085d6',
            denyButtonText: `카드`,
            denyButtonColor: '#3085d6',
            cancelButtonText: '취소',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                cashShow();
                console.log("cash")
                socketClient.emit("payButton", state);
                socketClient.emit("payCash", 0);
                setTimeout(() => {
                    cashClose();
                    history.push('/')
                }, 3000)
            } else if (result.isDenied) {
                cardShow();
                console.log("card")
                socketClient.emit("payButton", state);
                socketClient.emit("payCard", 1);
                setTimeout(() => {
                    cardClose();
                    history.push('/')
                }, 3000)
            }
        })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: '결제 오류',
            text: '메뉴를 선택 후 주문해 주세요'
        })
    }
}


/* 총 가격 출력 기능 */
function TotalPrice(props) {
    let totalPrice = 0;
    let data = props.reducerState
    let index = data.length;

    for(let i = 0; i < index; i++) {
        totalPrice += data[i].price
    }

    return (
        <>
            {
                index > 0
                    ?   <h3> { totalPrice } 원 </h3>
                    :   <h3> 0 원 </h3>
            }
        </>
    )
}

/* 주문 메뉴 장바구니 기능 */
function MenuOrderCart(props) {
    let data = props.reducerState;
    let [modal, setModal] = useState(false)
    let [clickNum, setClickNum] = useState(0)
    let [defaultPrice, setDefaultPrice] = useState(0)
    let modalShow = () => setModal(true)
    let modalClose = () => setModal(false)

    return (
        data.map((num, index) => {
            return (
                <>
                    {/*{ console.log(data.length) }
                    { console.log(index) }*/}
                    <div className = "recipeContent" onClick = {() => {
                        setClickNum(index)
                        modalShow()
                    }}>
                        <img src = { data[index].image }/>
                        <div className = "recipeDetail">
                            <p> { data[index].title } </p>
                        </div>
                        <div className = "recipeCount">
                            <p> { data[index].count } </p>
                            <p> { data[index].price } </p>
                        </div>
                    </div>
                    {
                        (index + 1) === data.length
                            ? modal === true
                                ? <MenuOptionReplace show = { modal }  modalClose = { modalClose } onHide = { modalClose }
                                                     image = { data[clickNum].image } title = { data[clickNum].title }
                                                     count = { data[clickNum].count } price = { data[clickNum].price }
                                                     defaultPrice = { data[clickNum].price / data[clickNum].count }
                                                     page = { props.page } menuIndex = { props.menuIndex }
                                />
                                : null
                            : null
                    }
                </>
            )
        })
    )
}

/* 카트에서 주문 메뉴 클릭 시 주문 수정 */
function MenuOptionReplace(props) {
    let dispatch = useDispatch()
    let [count, setCount] = useState(props.count)
    let state = useSelector((state) => state);
    let optionState = state.optionReducer;

    console.log(props.page)

    return (
        <div className = "modalContents">
            <Modal className = "modalDiv modal-dialog-centered" size = "xl" show = { props.show } onHide = { props.onHide }>
                <Modal.Header className = "optionModalHeader">
                    <div className = "optionModalHeaderText">
                        <h2> 주문 수정하기 </h2>
                    </div>
                    <div className = "helpText_opt">
                        <div className = "helpInfo_opt">
                            <p> 주문 </p>
                            <i className="fas fa-caret-right fa-3x helpArrow"></i>
                            <p> 옵션 선택 </p>
                            <i className="fas fa-caret-right fa-3x helpArrow"></i>
                            <p> 결제 </p>
                        </div>
                        <div className = "optionProgress">
                            <div className = "progress_option"></div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className = "optionModalBody">
                    <div className = "modalBodyLeft">
                        <img src = { props.image } />
                        <div className = "titleDiv">
                            <h3> { props.title } </h3>
                        </div>
                        <div className = "countDiv">
                            <div className ={ count == 1 ? "countDownButtonDisable" : "countDownButton" } onClick = {() => {
                                if(count > 1 && count <= 10) setCount(count - 1)
                            }}>
                                <div className="modalMinus"></div>
                            </div>
                            <div className="menuCountNumber">
                                <p> { count } </p>
                            </div>
                            <div className = { count == 10 ? "countDownButtonDisable" : "countDownButton" } onClick = {() => {
                                if(count >= 1 && count < 10) setCount(count + 1)
                            }}>
                                <div className="modalPlus"></div>
                            </div>
                        </div>
                    </div>
                    {
                        props.page === 'simple'
                            ?   <div className = "modalBodyRight_simple">
                                    <SimpleTemp title = { props.title } />

                                    <SimplePackage />

                                    <div className = "orderCheck">
                                        <div className = "orderCheckHeader">
                                            <h4> 주문메뉴 확인 </h4>
                                        </div>
                                        <div className = "orderCheckBody">
                                            <h4> 주문하신 메뉴는 </h4>
                                            <h4> { optionState[1] === 0 ? "차가운" : "따뜻한" } { props.title },
                                                { optionState[3] === 0 ? " 포장" : " 매장취식" } 입니다 </h4>
                                        </div>
                                    </div>
                                </div>

                            /* 옵션 저장 후 불러오는 기능은 추후 수정 */
                            :   <div className = "modalBodyRight">
                                    <SizeSelect />

                                    <IceSelect />

                                    <SyrupSelect />

                                    <PackageSelect />
                                </div>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <div className = "optionModalFooter">
                        <div className = "priceDiv">
                            <h3> 가격 : { props.defaultPrice } 원 </h3>
                        </div>
                        <div className = "footerButtons">
                            <Button className = "cancelButton" variant="secondary" onClick={ props.modalClose }>
                                <p> 돌아가기 </p>
                            </Button>
                            <Button  className = "addOrderButton" onClick={ () => {
                                /*props.setProgress(2);*/
                                props.modalClose();
                                dispatch({
                                    type: "항목수정",
                                    payload: {
                                        title: props.title, count: count, price: (props.price) * count,
                                        image: props.image, menuIndex: props.menuIndex, options: optionState
                                    }
                                })
                                /*dispatch({type : "주문추가", payload : { count : props.count,
                                        price : ( props.menuItem[props.id][props.clickNum].price ) * props.count }})*/
                            } }>
                                <p> 주문수정 </p>

                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

/* 각 메뉴 클릭 시 옵션 모달창 기능 */
function OptionDisplayModal(props) {
    const [show, setShow] = useState(false);
    const modalShow = () => setShow(true);
    const modalClose = () => setShow(false);
    let [clickNum, setClickNum] = useState(0)

    return (
        props.menuArray[props.tabChange].map((num, index) => {
            return (
                <>
                    <div className = "menu_Container" onClick={() => {
                        modalShow()
                        setClickNum(index)
                    }}>
                        <div className = "menuImages slide-boxes">
                            <img src = { props.menuImg[props.tabChange][index] }/>
                        </div>
                        <div className = "menuName slide-boxes">
                            <p> { props.menuArray[props.tabChange][index].title } </p>
                            <p> { props.menuArray[props.tabChange][index].price } 원 </p>
                        </div>
                    </div>
                    {
                        /* 반복이 끝나면 마지막에 모달을 호출함 */
                        (index + 1) === props.menuArray[props.tabChange].length
                            ?   <MenuOption show = { show } onHide = { modalClose } modalClose = { modalClose }
                                            image = { props.menuImg[props.tabChange][clickNum] }
                                            title = { props.menuArray[props.tabChange][clickNum].title }
                                            price = { props.menuArray[props.tabChange][clickNum].price }
                                            menuIndex = { props.tabChange } setProgress = { props.setProgress }
                                            page = { props.page }
                            />
                            :   null
                    }
                    <div>

                    </div>
                </>
            )

        })
    )
}

/* 음료 종류 탭 기능 */
function MenuVarietyTab (props) {
    let menu = ['커피', '버블티', '프라페', '스무디', '에이드', '주스', '차', '디저트']
    let tempArr = [0, 1, 2, 3]

    if(props.page === "simple") {
        return (
            <div className = "varietyContents">
                <div className = "menuTable">
                    <MenuGuide menu = { menu } tempArr = { tempArr } clickMenu = { props.clickMenu }
                               setTabChange = { props.setTabChange } />
                </div>
                <div className = "anotherMenuClick">
                    <Button onClick={() => {
                        window.location.replace("/SimpleOrder")
                    }}>
                        다른메뉴 선택하기 </Button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className = "varietyContents_order">
                <div className = "menuTable_top">
                    {
                        tempArr.map((num, index) => {
                            return (
                                <div onClick = { () => {
                                    props.translate = 0;
                                    props.setTabChange(index)
                                }}>
                                    <p className = "ppp"> { menu[index] } </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className = "menuTable_bot">
                    {
                        tempArr.map((num, index) => {
                            return (
                                <div onClick = { () => {
                                    props.translate = 0;
                                    props.setTabChange(index + 4)
                                }}>
                                    <p className = "ppp"> { menu[index + 4] } </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function MenuGuide(props) {
    let menuArr = [0, 1, 2]

    if(props.clickMenu === 0) {
        return (
            menuArr.map((num, index) => {
                return (
                    <div onClick = { () => {
                        props.translate = 0;
                        props.setTabChange(index)
                    } }>
                        <p> { props.menu[index] } </p>
                    </div>
                )
            })
        )
    }
    else if (props.clickMenu === 1) {
        return (
            menuArr.map((num, index) => {
                return (
                    <div onClick = { () => {
                        props.translate = 0;
                        props.setTabChange(index + 3)
                    } }>
                        <p> { props.menu[index + 3] } </p>
                    </div>
                )
            })
        )
    }
    else if (props.clickMenu === 2) {
        props.setTabChange(props.clickMenu + 4)

        return (
            <div onClick = { () => {

            } }>
                <p> { props.menu[props.clickMenu + 4] } </p>
            </div>
        )
    }
    else if (props.clickMenu === 3) {
        props.setTabChange(props.clickMenu + 4)

        return (
            <div onClick = { () => {

            } }>
                <p> { props.menu[props.clickMenu + 4] } </p>
            </div>
        )
    }
    else {
        return (
            <div onClick = { () => {
                console.log("잘못된 접근")
            } }>
                <p> 메뉴 선택중...  </p>
            </div>
        )
    }
}

export default Order;