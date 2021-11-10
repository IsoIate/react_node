import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, Button} from "react-bootstrap"
import qrcodeImg from '../../img/qrcodeImg.png'
import '../../css/FrontPage/QRModal.css'

function QRModal(props) {

    let history = useHistory();

    return (
        <>
            <Modal show = { props.show } onHide = { props.onHide } >
                <Modal.Header>
                    <div className = "headerDiv">
                        <h2> 전자출입명부 작성 </h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className = "qrBody">
                        <h3> 전자출입명부 작성을 위해 <br/>QR코드를 스캔해 주세요 </h3>
                        <img className = "qrcode" src = { qrcodeImg }/>
                        <h3> ABC 카페 </h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        history.push("./MainPage")
                    }}>
                        작성 완료 </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QRModal;