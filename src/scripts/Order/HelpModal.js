import React from 'react'
import {Button, Modal} from "react-bootstrap";
import helpImage from '../../img/helpImage.PNG'
import tempImage from '../../img/guide.png'
import '../../css/Order/HelpImage.css'
import $ from "jquery";

function HelpModal(props) {
    return (
        <>
            <Modal className = "modal-dialog-centered" size = "xl" show = { props.show } onHide = { props.onHide } backdrop = { "static" } keyboard = { false } >
                <Modal.Header className = "helpModalHeader">
                    <div className = "headerText">
                        <h2> 안내 페이지 </h2>
                    </div>
                    <div className = "closeBtnDiv">
                        <Button onClick = {() => {
                            props.onHide()
                        }}> 닫기 </Button>
                    </div>
                </Modal.Header>

                <Modal.Body style = {{ overflow : "hidden" }}>
                    <div class="help_Container">
                        <div class="help_Slide-box_1">
                            <div className = "helpDiv_1L">
                                <h2> 키오스크를 사용해서 </h2>
                                <h2> 메뉴를 주문하는 방법을 </h2>
                                <h2> 설명드리겠습니다. </h2>
                            </div>
                            <div className = "helpDiv_1R">
                                <h2> 주문 순서는 다음과 같습니다. </h2>
                                <img src = { tempImage } style={{ width : "100%"}} />
                            </div>
                        </div>
                        <div class="help_Slide-box_2">
                            <p>1</p>
                        </div>
                        <div class="help_Slide-box_3">
                            <p>1</p>
                        </div>
                    </div>

                    {/*<img className = "helpImage" src = { helpImage }/>*/}
                </Modal.Body>

                <Modal.Footer className = "helpModalFooter">
                    <div className = "help_leftArrowBtn" onClick={() => {
                        $('.help_Container').css('transform', 'translateX(0vw)');

                        /*if(translate >= -slideNum && translate < 0) {
                            /!*setTranslate(translate + 69.56)*!/
                            translate = translate + 69.56;
                            $('.menuItems').css('transform', 'translateX(' + (translate) + 'vw)');
                        }*/
                    }}>
                        <i className="fas fa-chevron-left fa-3x"></i>
                        <p> 이전 페이지 </p>
                    </div>
                    <div className = "help_rightArrowBtn" onClick = {() => {
                        $('.help_Container').css('transform', 'translateX(-59vw)');

                        /*if(translate > -slideNum  && translate <= 0) {
                            /!*setTranslate(translate - 69.56)*!/
                            translate = translate - 69.56;
                            $('.menuItems').css('transform', 'translateX(' + (translate) + 'vw)');
                        }*/
                    }}>
                        <p> 다음 페이지 </p>
                        <i className="fas fa-chevron-right fa-3x"></i>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default HelpModal;