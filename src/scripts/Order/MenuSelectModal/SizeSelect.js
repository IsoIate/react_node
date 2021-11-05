import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import mediumCup from "../../../img/mediumCup.png";
import largeCup from "../../../img/largeCup.png";
import '../../../css/Order/OptionSelectModal.css'

function SizeSelect(props) {
    let state = useSelector(state => state)
    let optionState = state.optionReducer;
    let dispatch = useDispatch();

    return (
        <>
            <div className = "optionDiv">
                <div className = "sizeOption">
                    <div className = "optionNameFirst">
                        <p> 사이즈 </p>
                    </div>
                    <div className="optionSelect">
                        <div className = "optionImages">
                            <div className = { optionState[0] === 0 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                                dispatch({ type : "사이즈변경", payload : 0 })
                            }}>
                                <img className = "selectBtnImg" src = { mediumCup }/>
                                <p> 미디엄 </p>
                            </div>
                            <div className = { optionState[0] === 1 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                                dispatch({ type : "사이즈변경", payload : 1 })
                            }}>
                                <img className = "selectBtnImg" src = { largeCup }/>
                                <p> 라지 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<>
                <div className="titleDiv">
                    { props.pageCheck === 0 ? <h4> 사이즈를 선택해 주세요 </h4> : <h4> 컵의 크기를 선택해 주세요 </h4> }
                </div>
                <div className = "optionDiv">
                    <div className = "sizeOption">
                        <div className = "optionName">
                            { props.pageCheck === 0 ? <p> 사이즈 </p> : <p> 컵 크기 </p> }
                        </div>
                        <div className="optionSelect">
                            <div className = "optionImages">
                                <div className = { props.optionState[0] === 1 ? "optionSelectedBtn" : "optionSelectBtn" } onClick={() => {
                                    props.dispatch({ type : "사이즈변경", payload : 1 })
                                    props.sizeChange(1);
                                    tempPrice = props.menuPrice;
                                }}>
                                    <img className = "selectBtnImg" src = { mediumCup }/>
                                    { props.pageCheck === 0 ? <p> 미디엄 </p> : <p> 중간 크기 </p> }
                                    <p className = "upgradeP"> + 0 </p>
                                </div>
                                <div className = { props.optionState[0] === 2 ? "optionSelectedBtn" : "optionSelectBtn" } onClick={() => {
                                    props.dispatch({ type : "사이즈변경", payload : 2 })
                                    props.sizeChange(2);
                                    tempPrice = (props.menuPrice + 1000);
                                }}>
                                    <img className = "selectBtnImg" src = { largeCup }/>
                                    { props.pageCheck === 0 ? <p> 라지 </p> : <p> 큰 크기 </p> }
                                    <p className = "upgradeP"> + 0 </p>
                                </div>
                                <div className = "commentDiv">
                                    {
                                        props.pageCheck === 1 ?
                                            props.sizeSelect === 1 ?
                                                <div className = "sizeComment">
                                                    <h3> 작은 물병 사이즈에요 </h3>
                                                    <h3> 큰 컵에 비해서<br/> 300ml정도 양이 적어요 </h3>
                                                </div>
                                                : <div className = "sizeComment">
                                                    <h3> 큰 물병 사이즈에요 </h3>
                                                    <h3> 작은 컵에 비해서<br/> 300ml정도 양이 많아요 </h3>
                                                </div>
                                            : null }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { console.log(tempPrice) }
                { props.costChange(tempPrice) }
            </>*/}
        </>
    )
}

export default SizeSelect;