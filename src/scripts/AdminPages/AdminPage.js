import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import AdminNav from "./AdminNav";
import LeftNav from "./LeftNav";
import TempPage from "./TempPage";
import '../../css/AdminPages/AdminPage.css'
import axios from "axios";

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
        <div className = "revenueDiv">
            <LeftNav/>

            <div className="container mt-3" className = "rightDiv">
                <AdminNav/>

                <TempPage/>

                {/*<div className = "bodyDiv">
                    <div className = "bodyTopDiv">
                        <div className = "totalRevenue">
                            <div className = "revenueChart">
                                <Chart options={totalRevenue.options} series={totalRevenue.options.series} type="line"
                                       width="200%" height="150%"/>
                            </div>
                        </div>
                        <div className = "payHistory">
                            <Chart options={payments.options} series={payments.options.series} type="donut"
                                   width="100%" height="100%"/>
                        </div>
                    </div>
                    <div className = "bodyBottomDiv">
                        <div className = "visitors">
                            <Chart options={visitors.options} series={visitors.options.series} type="bar"
                                   width="100%" height="150%"/>
                        </div>
                        <div className = "topRevenue">
                            <Chart options={topRevenue.options} series={topRevenue.options.series} type="bar"
                                   width="100%" height="100%"/>
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    )
}

export default AdminPage;