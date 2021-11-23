import React, {useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import coffee from '../../img/coffee/americano.png'
import ade from '../../img/ade/greenGrapeAde.png'
import tea from '../../img/tea/earlgreyTea.png'
import dessert from '../../img/dessert/cheeseCake.png'
import '../../css/Order/HelpModal.css'
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";

function HelpModal(props) {
    let tempArr = [0, 1]
    let menu = ['커피', '과일/탄산음료', '차', '간식']
    let menuImage = [coffee, ade, tea, dessert]
    let [tap, setTap] = useState(0)
    let [tapShow, setTapShow] = useState(false)
    let dispatch = useDispatch()

    const Toast = Swal.mixin({
        width: 750,
        padding: 50,
        toast: true,
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    return (
        <>
            <Modal className = "modal-dialog-centered" size = "xl" show = { props.show } onHide = { props.onHide } backdrop = { "static" } keyboard = { false } >
                <Modal.Body className = "helpModalBody">
                    <div className = "helpBodyHeader">
                        <h2> 저희 카페에 방문해 주셔서 감사합니다. </h2>
                        <h2> 드시고 싶은 음료의 종류를 선택해 주세요. </h2>
                    </div>
                    {
                        tapShow === false
                            ?   tempArr.map((num1, idx1) => {
                                    return (
                                        <div className = "helpBodyContents">
                                            {
                                                tempArr.map((num2, idx2) => {
                                                    return (
                                                        <div className = "helpBodyContainer">
                                                            <img src = { menuImage[idx2 + (idx1 * 2)] }/>
                                                            <Button onClick={() => {
                                                                setTap(idx2 + (idx1 * 2))
                                                                setTapShow(true)
                                                                dispatch({ type : "탭 변경", payload : (idx2 + (idx1 * 2))})
                                                                Toast.fire({
                                                                    icon: 'info',
                                                                    title: '선택하신 메뉴 [' + menu[idx2 + (idx1 * 2)] + '] 로 안내해 드리겠습니다.'
                                                                })
                                                            }}> { menu[idx2 + (idx1 * 2)] } </Button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            :   ModalTap(tap, props.onHide)

                    }
                </Modal.Body>
{/*
                <Modal.Footer>
                    <div className = "pageMoveBtn">
                        <Button className = "modalCloseBtn btn-danger" onClick={() => {
                            props.onHide()
                        }}> 닫기 </Button>
                    </div>
                </Modal.Footer>*/}
            </Modal>
        </>
    )
}

/* 안내 페이지에서 음료 선택시 모달 닫는 함수 */
function ModalTap(tap, onHide) {
    let dispatch = useDispatch()
    dispatch({ type : "음료 안내", payload : tap })
    onHide()
}

export default HelpModal;