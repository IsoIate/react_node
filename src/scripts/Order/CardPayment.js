import React, {useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import payment from "../../img/payment.png";

import '../../css/Order/CardPayment.css'

function CardPayment(props) {
    return (
        <>
            <Modal show = { props.cardShow } onHide = { props.onHide } backdrop = { "static" } keyboard = { false } >
                <Modal.Header>
                    <div className = "headerDiv">
                        <h2> 카드 결제 </h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className = "qrBody">
                        <h2 style = {{ textAlign : "center" }} > IC칩이 위를 향하도록 <br/> 카드를 꽂아주세요 </h2>
                        <img className = "cardPayment" src = { payment }/>
                        <i className="fas fa-caret-up fa-5x cardInsert"></i>
                        <h2> ABC 카페 </h2>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CardPayment;