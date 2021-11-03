import React from 'react'
import iceDrink from "../../../img/iceDrink.png";
import Drink from "../../../img/drink.png";
import hotDrink from "../../../img/hotDrink.png";
import '../../../css/Order/OptionSelectModal.css'

function IceSelect(props) {
    return (
        <div className = "optionDiv">
            <div className = "iceOption">
                <div className = "optionName">
                    <p> 얼음 </p>
                </div>
                <div className="optionSelect">
                    <div className = "optionImages">
                        <div className = "optionSelectBtn">
                            <img className = "selectBtnImg" src = { iceDrink }/>
                            <p> 얼음 많이 </p>
                        </div>
                        <div className = "optionSelectBtn">
                            <img className = "selectBtnImg" src = { Drink }/>
                            <p> 얼음 조금 </p>
                        </div>
                        <div className = "optionSelectBtn">
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