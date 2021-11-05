import React, {useEffect, useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import '../../css/Order/MenuOption.css'
import coffee0 from "../../img/coffee/americano.png";
import '../../css/Order/OptionSelectModal.css'
import SizeSelect from "./MenuSelectModal/SizeSelect";
import IceSelect from "./MenuSelectModal/IceSelect";
import SyrupSelect from "./MenuSelectModal/SyrupSelect";
import PackageSelect from "./MenuSelectModal/PackageSelect";
import {useDispatch, useSelector} from "react-redux";

function MenuOption(props) {
    let state = useSelector((state) => state);
    let reducerState = state.reducer;
    let optionState = state.optionReducer;
    let dispatch = useDispatch();
    let [count, setCount] = useState(1);

    useEffect(() => {
        setCount(1)
    }, [props.onHide])

    return (
        <div className = "modalContents">
            <Modal className = "modalDiv modal-dialog-centered" size = "xl" show = { props.show } onHide = { props.onHide }>
                <Modal.Header className = "optionModalHeader">
                    <h2> 주문하기 </h2>
                </Modal.Header>
                <Modal.Body className = "optionModalBody">
                    <div className = "modalBodyLeft">
                        <img src = { props.image } />
                        <div className = "titleDiv">
                            <h3> { props.title } </h3>
                        </div>
                        <div className = "countDiv">
                            <div className ={ count == 1 ? "countDownButtonDisable" : "countDownButton" } onClick = {() => {
                                if(count > 1 && count <= 10) setCount(count - 1)
                            }}>
                                <div className="modalMinus"></div>
                            </div>
                            <div className="menuCountNumber">
                                <p> { count } </p>
                            </div>
                            <div className = { count == 10 ? "countDownButtonDisable" : "countDownButton" } onClick = {() => {
                                if(count >= 1 && count < 10) setCount(count + 1)
                            }}>
                                <div className="modalPlus"></div>
                            </div>
                        </div>
                    </div>
                    <div className = "modalBodyRight">
                        <SizeSelect />

                        <IceSelect />

                        <SyrupSelect />

                        <PackageSelect />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div className = "optionModalFooter">
                        <div className = "priceDiv">
                            <h3> 가격 : { props.price } 원 </h3>
                        </div>
                        <div className = "footerButtons">
                            <Button className = "cancelButton" variant="secondary" onClick={ props.handleClose }>
                                <p> 돌아가기 </p>
                            </Button>
                            <Button  className = "addOrderButton" onClick={ () => {
                                props.handleClose();

                                dispatch({
                                    type: "항목추가",
                                    payload: {
                                        title: props.title, count: count,
                                        price: (props.price) * count , image: props.image
                                    }
                                })


                                /*dispatch({type : "주문추가", payload : { count : props.count,
                                        price : ( props.menuItem[props.id][props.clickNum].price ) * props.count }})*/
                            } }>
                                <p> 주문추가 </p>

                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MenuOption;