import React from 'react'
import iceDrink from "../../../img/iceDrink.png";
import Drink from "../../../img/drink.png";
import hotDrink from "../../../img/hotDrink.png";
import '../../../css/Order/OptionSelectModal.css'
import {useDispatch, useSelector} from "react-redux";

function IceSelect(props) {
    let state = useSelector(state => state)
    let optionState = state.optionReducer;
    let dispatch = useDispatch();

    return (
        <div className = "optionDiv">
            <div className = "iceOption">
                <div className = "optionName">
                    <p> 얼음 </p>
                </div>
                <div className="optionSelect">
                    <div className = "optionImages">
                        <div className = { optionState[1] === 0 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                            dispatch({ type : "얼음변경", payload : 0 })
                        }}>
                            <img className = "selectBtnImg" src = { iceDrink }/>
                            <p> 얼음 많이 </p>
                        </div>
                        <div className = { optionState[1] === 1 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                            dispatch({ type : "얼음변경", payload : 1 })
                        }}>
                            <img className = "selectBtnImg" src = { Drink }/>
                            <p> 얼음 조금 </p>
                        </div>
                        <div className = { optionState[1] === 2 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                            dispatch({ type : "얼음변경", payload : 2 })
                        }}>
                            <img className = "selectBtnImg" src = { hotDrink }/>
                            <p> 따뜻하게 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IceSelect;