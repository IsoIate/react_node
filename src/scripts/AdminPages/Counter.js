import React, {useEffect, useState} from 'react'
import { Button } from "react-bootstrap";
import axios from "axios";
import {connect} from "react-redux";
import io from 'socket.io-client';
import LiveClock from 'react-live-clock'

import logo from '../../img/cafelogo.png'
import { useHistory } from "react-router-dom";

import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import AdminNav from "./AdminNav";
import CashMenuDetail from "./CashMenuDetail";
import CardMenuDetail from "./CardMenuDetail";
import '../../css/AdminPages/Counter.css';

const socketClient = io("http://localhost:8080");


function Counter(props) {

    let history = useHistory();

    /*let [data, setData] = useState(null);*/
    let [socketReq, setSocketReq] = useState(null);
    let [cashSocket, setCashSocket] = useState(null);
    let [cardSocket, setCardSocket] = useState(null);
    let [total, setTotal] = useState(null);
    /* getCounter라는 url로 접속했을 때 아래 코드 실행 */
    /*useEffect(() => {

        axios.get('/getCounter')

            .then(( res ) => {
                setData(res.data.comp)
                /!*console.log(res.data.comp)*!/
            })
            .catch(( error )=>{ console.log( error ) })

    }, [])*/

    useEffect(() => {
        let total = new Object();
        let totalPrice = 0;
        let totalCount = 0;
        socketClient.on("payRespond", req => {
            console.log("pay?")
            console.log(req)

            for(let i = 0; i < req.length; i++) {
                totalPrice += req[i].price
                totalCount += req[i].count
            }

            total.price = totalPrice
            total.count = totalCount

            console.log(total)
            setSocketReq(req)
            setTotal(total)
        })
    }, [socketClient.on])

    useEffect(() => {
        socketClient.on("payCash", req => {
            console.log("cash!")
            console.log(req)
            setCashSocket(req)
        })
    }, [socketClient.on])

    useEffect(() => {
        socketClient.on("payCard", req => {
            console.log("card!")
            console.log(req)
            setCardSocket(req)
        })
    }, [socketClient.on])

    return (
        <div className = "counterDiv">

            <LeftNav />

            <div className = "counterBody">

                <AdminNav />

                <div className="container mt-3" className = "bodyDiv">

                    <div className = 'container-fluid bodyContents'>
                        <div className = "bodyBox">
                            <div className = "contentsHeader">
                                <div className = "contentsDiv">
                                    <div className = "groupCount">
                                        <div> # </div>
                                    </div>
                                    <div className = "menuDetail">
                                        <div className = "md1"> 메뉴명 </div>
                                        <div className = "md2"> 수량 </div>
                                        <div className = "md2"> 가격 </div>
                                        <div className = "md1"> 옵션 </div>
                                    </div>
                                </div>
                            </div>
                            {
                                socketReq != null ?
                                    cashSocket != null ?
                                        <CashMenuDetail req = { socketReq } cash = { cashSocket } total = { total } />
                                        : cardSocket != null ?
                                            <CardMenuDetail req = { socketReq } card = { cardSocket } total = { total } />
                                        : null
                                    : null
                            }
                        </div>
                    </div>

                    <RightNav />

                </div>
            </div>
        </div>
    )
}

/* state를 props로 변환 */
function Conversion(state) {
    return {
        state : state.reducer,
        receiptState : state.receiptReducer,
        counterConfirmState : state.counterConfirmReducer
    }
}

export default connect(Conversion)(Counter);