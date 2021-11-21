import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import takeAway from "../../../img/takeAway.png";
import inStore from "../../../img/inStore.png";
import '../../../css/Order/OptionSelectModal.css'

function SimplePackage(props) {
    let state = useSelector(state => state)
    let optionState = state.optionReducer;
    let dispatch = useDispatch();

    return (
        <div className = "optionDiv">
            <div className = "packageOption">
                <div className = "simpleOptionLast">
                    <p> 포장 </p>
                </div>
                <div className="simpleOptionSelect">
                    <div className = "optionImages">
                        <div className = { optionState[5] === 0 ? "simpleTempSelected" : "simpleTempSelect" } onClick = {() => {
                            dispatch({ type : "간단 포장변경", payload : 0 })
                        }}>
                            <img className = "selectBtnImg" src = { takeAway }/>
                            <p> 포장해서<br/>가져가기 </p>
                        </div>
                        <div className = { optionState[5] === 1 ? "simpleTempSelected borderRB" : "simpleTempSelect" } onClick = {() => {
                            dispatch({ type : "간단 포장변경", payload : 1 })
                        }}>
                            <img className = "selectBtnImg" src = { inStore }/>
                            <p> 매장에서<br/>취식하기 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimplePackage;