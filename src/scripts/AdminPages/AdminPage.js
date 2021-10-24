import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import AdminNav from "./AdminNav";
import '../../css/AdminPages/AdminPage.css'
import LeftNav from "./LeftNav";
import RevenueTable from "./RevenueTable";
import axios from "axios";
import RecentRevenue from "./RecentRevenue";

function AdminPage() {
    let history = useHistory();
    let [price, setPrice] = useState(0);
    let [people, setPeople] = useState(0);
    let [payment, setPayment] = useState(null);
    let callPage = 1;

    /* 매출 정보 */
    useEffect(() => {
        axios.get('/getPrice')

            .then(( res ) => {
                setPrice(res.data)
            })
            .catch(( error )=>{ console.log( error ) })

    }, [])

    /* 방문자 정보 */
    useEffect(() => {
        axios.get('/getVisitors')
            .then((res) => {
                setPeople(res.data);
            })
            .catch((error) => { console.log( error ) })
    }, [])

    /* 지불 정보 */
    useEffect(() => {
        axios.get('/getPayment')
            .then((res) => {
                let temp = JSON.parse(res.data)
                setPayment(temp[0]);
            })
            .catch((error) => { console.log( error )})
    })

    return (
        <div className = "totalDiv">
            <LeftNav/>
            <div className = "rightDiv">
                <AdminNav/>

                <div className = "container-fluid contents">
                    <div className = "row topTables">
                        <div className = "container col-lg-11 status">
                            <h2 className = "titleHeader">
                                총 매출 <i className="fas fa-angle-right fa-1x"></i>
                            </h2>
                            <div className = "totalRevDiv">
                                <div className = "leftBox">
                                    <h2> 총 매출 </h2>
                                    <div className = "getInline">
                                        <div className = "revText">
                                            <h1> { price } </h1>
                                            <h3>원</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className = "centerBox">
                                    <h2> 결제방법 </h2>
                                    <div className = "getInline">
                                        <div className = "payMethod">
                                            {
                                                payment != null
                                                    ? <>
                                                            <div>
                                                                <h3> 현금 </h3>
                                                                <h3> { payment.cash } 원</h3>
                                                            </div>
                                                            <div>
                                                                <h3> 카드 </h3>
                                                                <h3> { payment.card } 원</h3>
                                                            </div>
                                                        </>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className = "rightBox">
                                    <h2> 이용객 수 </h2>
                                    <div className = "getInline">
                                        <div className = "peopleCount">
                                            <h1> { people } </h1>
                                            <h3>명</h3>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className = "row btmTables">
                        <div className = "container col-lg-11 recentRev">
                            <h2>
                                최근매출 <i className="fas fa-angle-right fa-1x"></i>
                            </h2>
                            <div>
                                <RecentRevenue callPage = { callPage } />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;