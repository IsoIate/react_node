import React from "react";
import {Button, Modal} from "react-bootstrap";
import cash from "../../img/cash.png";

import '../../css/Order/CashPayment.css'

function CashPayment(props) {
    return (
        <>
            <Modal show = { props.cashShow } onHide = { props.onHide } backdrop = { "static" } keyboard = { false } >
                <Modal.Header>
                    <div className = "headerDiv">
                        <h2> 현금 결제 </h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className = "qrBody">
                        <h2 style = {{ textAlign : "center" }} > 현금을 가지런히 펴서 <br/> 투입구에 넣어주세요 </h2>
                        <img className = "cardPayment" src = { cash }/>
                        <i className="fas fa-caret-up fa-5x cardInsert"></i>
                        <h2> ABC 카페 </h2>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CashPayment;