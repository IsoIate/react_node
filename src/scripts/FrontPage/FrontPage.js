import React, {useEffect, useState} from 'react';
import {Link, Route, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

import Title from './Title'
import QRModal from "./QRModal";
import SelfModal from "./SelfModal";

import '../../css/FrontPage/FrontPage.css'
import qrcode from "../../img/qrcode.png"
import guide from '../../img/guide.png'

function FrontPage(props) {
    let history = useHistory();

    const [qrShow, setQrShow] = useState(false);
    const qrClose = () => setQrShow(false);
    const qrOpen = () => setQrShow(true);

    const [selfShow, setSelfShow] = useState(false);
    const selfClose = () => setSelfShow(false);
    const selfOpen = () => setSelfShow(true);

    return (
        <div className = "frontPage">
            <div className = "frontHeader">
                <Title />
            </div>
            <div className = "frontBody">
                <div className = "frontBodyLeft">
                    <div className = "intro">
                        <div className = "introDiv">
                            <h2> 저희 카페에 오신 것을 환영합니다! </h2>
                            <p> 저희 매장에 방문한 고객님께서는<br/> 아래 버튼을 클릭하여 방문기록을 작성해 주시길 바랍니다. </p>
                        </div>
                        <div className = "guideDiv">
                            <img className = "guideImg" src = { guide } />
                        </div>
                    </div>
                    <div className = "guestBook">
                        <Button className = "writeBtn" size="lg" onClick={() => {
                            qrOpen();
                        }}> QR코드로 출입명부 작성하기 </Button>

                        <Button className = "writeBtn" size = "lg" onClick = {() => {
                            selfOpen();
                        }}> 수기로 출입명부 작성하기 </Button>
                    </div>

                    {
                        qrShow === true ?
                            < QRModal show = { qrShow } onHide = { qrClose } />
                            : selfShow === true ?
                                < SelfModal show = { selfShow } onHide = { selfClose } />
                                : null
                    }
                </div>
                <div className = "frontBodyRight">
                    <div className = "qrDiv">
                        <img className = "qrcodeImg" src = { qrcode } />
                    </div>
                </div>
            </div>
            <div className = "frontFooter">


            </div>
        </div>
    )
}


export default FrontPage