import React from 'react'
import '../../css/Order/TempPage.css'
import tempImg from '../../img/coffee/americano.png'
import logo from "../../img/cafelogo.png";
import LiveClock from "react-live-clock";
import $ from 'jquery';

function TempPage() {
    let tempArr = [0, 0, 0, 0, 0, 0, 0, 0]
    const date = new Date();
    let translate = 0;

    return (
        <div className = "orderContents">
            <div className = "leftContents">
                <div className = "topContents">
                    <div className = "topLogoBox">
                        <img className = "logoImage" src = { logo }/>
                        <p> Coffee House </p>
                    </div>
                    <div className = "showDate">
                        <div>
                            { date.getMonth() + 1 + "월 "}
                            { date.getDate() + "일"}
                        </div>
                        <div>
                            <LiveClock format ={"HH:mm:ss"} interval = { 1000 } ticking = { true } />
                        </div>
                    </div>
                </div>
                <div className = "orderBody">
                    <div className = "menuContents">
                        <div className = "menuItems">
                            {
                                tempArr.map((num, index) => {
                                    return (
                                        <div className = "menu_Container">
                                            <div className = "menuImages slide-boxes">
                                                <img src = { tempImg }/>
                                            </div>
                                            <div className = "menuName slide-boxes">
                                                <p> 아메리카노 { index } </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className = "arrowBtnDiv">
                    <div className = "leftArrowBtn" onClick={() => {
                        translate = translate +69.56;
                        $('.menuItems').css('transform', 'translateX(' + ( translate ) + 'vw)');
                    }}>
                        <i className="fas fa-chevron-left fa-3x"></i>
                        <p> 이전 페이지 </p>
                    </div>
                    <div className = "rightArrowBtn" onClick = {() => {
                        translate = translate -69.56;
                        $('.menuItems').css('transform', 'translateX(' + ( translate ) + 'vw)');
                    }}>
                        <p> 다음 페이지 </p>
                        <i className="fas fa-chevron-right fa-3x"></i>
                    </div>
                </div>
                <div className = "varietyContents">
                    <p> 커피, 음료 등 선택창 </p>
                </div>
            </div>
            <div className = "rightContents">
                <div className = "recipeContents">
                    <p> 주문 정보 </p>
                </div>
                <div className = "payContents">
                    <p> 가격 정보 </p>
                </div>
                <div className = "payButton">
                    <p> 버튼 </p>
                </div>
            </div>
        </div>
    )
}

export default TempPage;