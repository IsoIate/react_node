import React from 'react'
import {Modal} from "react-bootstrap";
import '../../css/Order/MenuOption.css'
import coffee0 from "../../img/coffee/americano.png";

function MenuOption(props) {
    return (
        <div className = "modalContents">
            <Modal className = "modal-lg" show = { props.show } onHide = { props.onHide }>
                <Modal.Header>
                    <h2> 주문 옵션 추가 </h2>
                </Modal.Header>
                <Modal.Body className = "modalBody">
                    <div className = "modalBodyLeft">
                        <img src = { coffee0 } />
                        <div>
                            <div className = "countDownButton">
                                <div className="modalMinus"></div>
                            </div>
                            <div className="menuCountNumber">
                                <p> 1 </p>
                            </div>
                            <div className = "countUpButton">
                                <div className="modalPlus"></div>
                            </div>
                        </div>
                    </div>
                    <div className = "modalBodyRight">
                        <div className = "optionSize">
                            <div className = "optionTitle">
                                <h3> 컵 크기를 선택해 주세요 </h3>
                            </div>
                            <div className = "sizeSelect">

                            </div>
                        </div>
                        <div className = "optionIce">
                            <div className = "optionTitle">
                                <h3> 얼음 여부를 선택해 주세요 </h3>
                            </div>
                            <div className = "iceSelect">

                            </div>
                        </div>
                        <div className = "optionSyrup">
                            <div className = "optionTitle">
                                <h3> 시럽 여부를 선택해 주세요 </h3>
                            </div>
                            <div className = "syrupSelect">

                            </div>
                        </div>
                        <div className = "optionPackage">
                            <div className = "optionTitle">
                                <h3> 포장 여부를 선택해 주세요 </h3>
                            </div>
                            <div className = "packageSelect">

                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <p> footer </p>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MenuOption;