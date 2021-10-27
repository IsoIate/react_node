import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import AdminNav from "./AdminNav";
import LeftNav from "./LeftNav";
import ChartPage from "./ChartPage";
import '../../css/AdminPages/AdminPage.css'
import axios from "axios";

function AdminPage() {
    let history = useHistory();
    let [monthRev, setMonthRev] = useState(null);
    let [people, setPeople] = useState(0);
    let [payment, setPayment] = useState(null);
    let callPage = 1;

    /* 매출 정보 */
    useEffect(() => {
        axios.get('/getMonthRev')

            .then(( res ) => {
                setMonthRev(res.data)
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
                let data = res.data;
                setPayment(data);
            })
            .catch((error) => { console.log( error )})
    }, [])

    return (
        <div className = "revenueDiv">
            <LeftNav/>

            <div className="container mt-3" className = "rightDiv">
                <AdminNav/>

                <ChartPage monthRev = { monthRev } payment = { payment } />
            </div>
        </div>
    )
}

export default AdminPage;