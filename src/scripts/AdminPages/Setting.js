import React, {useState} from 'react';
import { Button } from "react-bootstrap";
import axios from "axios";
import LeftNav from "./LeftNav";
import AdminNav from "./AdminNav";
import '../../css/AdminPages/Setting.css';
import DBResetModal from "./DBResetModal";
import multer from 'multer';
import fs from 'fs';


function Setting() {

    const [show, setShow] = useState(false);
    const close = () => setShow(false);
    const open = () => setShow(true);
    let jsonData = [
        {
            id: 0,
            title : "아메리카노",
            content : "아메리카노",
            price : 1500,
            comment : "커피 원액과 물을 섞은 씁쓸한 커피"
        },

        {
            id: 1,
            title : "카페라떼",
            content : "카페라떼",
            price : 2500,
            comment : "커피 원액에 우유을 섞은 달콤씁쓸한 커피"
        },

        {
            id: 2,
            title : "바닐라라떼",
            content : "바닐라라떼",
            price : 2500,
            comment : "커피 원액에 우유와 시럽을 섞은 달콤씁쓸한 커피"
        },

        {
            id : 3,
            title : "카페모카",
            content : "카페모카",
            price : 2500,
            comment : "커피 원액에 우유와 초콜릿을 섞은 달콤한 커피"
        },

        {
            id : 4,
            title : "헤이즐넛",
            content : "헤이즐넛",
            price : 3500,
            comment : "옛 시절 추억을 떠올릴 수 있는 다방커피"
        },

        {
            id : 5,
            title : "카라멜마끼아또",
            content : "카라멜마끼아또",
            price : 3000,
            comment : "커피 원액, 우유, 카라멜 시럽을 섞은 달콤한 커피"
        },

        {
            id : 6,
            title : "티라미수라떼",
            content : "티라미수라떼",
            price : 4000,
            comment : "커피 원액에 우유와 티라미수를 섞은 달콤한 커피"
        }]


    return (
        <>
            <div className = "totalDiv">
                <LeftNav/>
                <div className = "rightDiv">
                    <AdminNav/>
                    <div>
                        <h2 className = "settingHeader"> 설정 페이지 </h2>
                        <div className = "resetDiv">
                            <div className = "resetRight">

                            </div>
                            <div className = "resetLeft">
                                <div className = "dbReset">
                                    <h3> 데이터베이스 초기화 </h3>
                                    <Button onClick = {() => {
                                        open();
                                    }}> 초기화 </Button>
                                </div>
                                <div className = "pwReset">
                                    <h3> 비밀번호 초기화 </h3>
                                    <Button onClick = {() => {
                                        /*axios.get('/dbReset')
                                            .then((res) => {
                                                console.log(res.data);
                                            })*/
                                    }}> 초기화 </Button>
                                </div>
                                {/*<div className = "dbReset">
                                    <h3> 데이터베이스 추가 </h3>
                                    <Button onClick = {() => {
                                        axios.get('/dbInsert')
                                            .then((res) => {
                                                console.log(res.data);
                                            })
                                    }}> 추가 </Button>
                                </div>*/}
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {
                show === true ?
                    < DBResetModal show = { show } onHide = { close } />
                    : null
            }
        </>
    )
}

export default Setting;