import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import iceDrink from "../../../img/iceDrink.png";
import hotDrink from "../../../img/hotDrink.png";
import '../../../css/Order/OptionSelectModal.css'

function SimpleTemp(props) {
    let state = useSelector(state => state)
    let optionState = state.optionReducer;
    let dispatch = useDispatch();

    return (
        <>
            <div className = "optionDiv">
                <div className = "sizeOption">
                    <div className = "simpleOptionFirst">
                        <p> 음료<br/>온도 </p>
                    </div>
                    <div className="simpleOptionSelect">
                        <div className = "optionImages">
                            <div className = { optionState[1] === 0 ? "simpleTempSelected" : "simpleTempSelect" } onClick = {() => {
                                dispatch({ type : "얼음변경", payload : 0 })
                            }}>
                                <img className = "selectBtnImg" src = { iceDrink }/>
                                <p style={{ color : "blue" }}> 차가운 </p>
                                <p> { props.title } </p>
                            </div>
                            <div className = { optionState[1] === 2 ? "simpleTempSelected borderRT" : "simpleTempSelect" } onClick = {() => {
                                dispatch({ type : "얼음변경", payload : 2 })
                            }}>
                                <img className = "selectBtnImg" src = { hotDrink }/>
                                <p style={{ color : "red" }}> 따뜻한 </p>
                                <p> { props.title } </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SimpleTemp;