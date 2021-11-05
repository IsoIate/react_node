import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import takeAway from "../../../img/takeAway.png";
import inStore from "../../../img/inStore.png";
import '../../../css/Order/OptionSelectModal.css'

function PackageSelect(props) {
    let state = useSelector(state => state)
    let optionState = state.optionReducer;
    let dispatch = useDispatch();

    return (
        <div className = "optionDiv">
            <div className = "packageOption">
                <div className = "optionNameLast">
                    <p> 포장 </p>
                </div>
                <div className="optionSelect">
                    <div className = "optionImages">
                        <div className = { optionState[3] === 0 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                            dispatch({ type : "포장변경", payload : 0 })
                        }}>
                            <img className = "selectBtnImg" src = { takeAway }/>
                            <p> 테이크아웃 </p>
                        </div>
                        <div className = { optionState[3] === 1 ? "optionSelectedBtn" : "optionSelectBtn" } onClick = {() => {
                            dispatch({ type : "포장변경", payload : 1 })
                        }}>
                            <img className = "selectBtnImg" src = { inStore }/>
                            <p> 매장 취식 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        /*<>
            <div className="titleDiv">
                { props.pageCheck === 0 ? <h4> 테이크아웃 하시겠습니까? </h4> : <h4> 포장 하시겠습니까? </h4> }
            </div>
            <div className = "optionDiv">
                <div className = "packageOption">
                    <div className = "optionName">
                        <p> 포장 </p>
                    </div>
                    <div className="optionSelect">
                        <div className = "optionImages">
                            <div className = { props.optionState[3] === 1 ? "optionSelectedBtn" : "optionSelectBtn" } onClick={() => {
                                props.dispatch({ type : "포장변경", payload : 1 })
                            }}>
                                <img className = "selectBtnImg" src = { takeAway }/>
                                { props.pageCheck === 0 ? <p> 테이크아웃 </p> : <p> 포장하기 </p> }
                            </div>
                            <div className = { props.optionState[3] === 2 ? "optionSelectedBtn" : "optionSelectBtn" } onClick={() => {
                                props.dispatch({ type : "포장변경", payload : 2 })
                            }}>
                                <img className = "selectBtnImg" src = { inStore }/>
                                <p> 매장 취식 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>*/
    )
}

/* state를 props로 변환 */
function Conversion(state) {
    return {
        optionState: state.optionReducer
    }
}

export default connect(Conversion)(PackageSelect);