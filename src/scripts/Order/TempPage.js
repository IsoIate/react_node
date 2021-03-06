/*
import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import '../../css/Order/TempPage.css'
import logo from "../../img/cafelogo.png";
import LiveClock from "react-live-clock";
import $ from 'jquery';
import coffeeData from "../../data/coffeeData";
import bubbleTeaData from "../../data/bubbleTeaData";
import frappeData from "../../data/frappeData";
import smoothieData from "../../data/smoothieData";
import adeData from "../../data/adeData";
import juiceData from "../../data/juiceData";
import teaData from "../../data/teaData";
import dessertData from "../../data/dessertData";
import coffee0 from "../../img/coffee/americano.png";
import coffee1 from "../../img/coffee/cafelatte.png";
import coffee2 from "../../img/coffee/vanillalatte.png";
import coffee3 from "../../img/coffee/cafemoca.png";
import coffee4 from "../../img/coffee/hazelnut.png";
import coffee5 from "../../img/coffee/caramelmacchiato.png";
import coffee6 from "../../img/coffee/tiramisulatte.png";
import bubbleTea0 from "../../img/bubbleTea/milkTeaBubbleLatte.png";
import bubbleTea1 from "../../img/bubbleTea/blackSugarBubbleLatte.png";
import bubbleTea2 from "../../img/bubbleTea/dalgonaBubbleLatte.png";
import bubbleTea3 from "../../img/bubbleTea/blackSugarSweetPotatoLatte.png";
import frappe0 from "../../img/frappe/javaChipFrappe.png";
import frappe1 from "../../img/frappe/cncFrappe.png";
import frappe2 from "../../img/frappe/mintChocoFrappe.png";
import frappe3 from "../../img/frappe/strawberryCreamFrappe.png";
import frappe4 from "../../img/frappe/greenTeaFrappe.png";
import smoothie0 from "../../img/smoothie/plainYogurt.png";
import smoothie1 from "../../img/smoothie/strayberryYogurt.png";
import smoothie2 from "../../img/smoothie/blueberryYogurt.png";
import smoothie3 from "../../img/smoothie/mangoYogurt.png";
import smoothie4 from "../../img/smoothie/strawberryBananaYogurt.png";
import smoothie5 from "../../img/smoothie/mangoBananaYogurt.png";
import smoothie6 from "../../img/smoothie/appleMangoCrush.png";
import ade0 from "../../img/ade/grapefruitLimeAde.png";
import ade1 from "../../img/ade/greenGrapeAde.png";
import ade2 from "../../img/ade/lemonAde.png";
import ade3 from "../../img/ade/blueLemonAde.png";
import ade4 from "../../img/ade/citronAde.png";
import ade5 from "../../img/ade/calamansiAde.png";
import juice0 from "../../img/juice/bananaJuice.png";
import juice1 from "../../img/juice/tomatoJuice.png";
import juice2 from "../../img/juice/kiwiJuice.png";
import tea0 from "../../img/tea/blueTangerineTea.png";
import tea1 from "../../img/tea/gingerTea.png";
import tea2 from "../../img/tea/lemonTea.png";
import tea3 from "../../img/tea/grapefruiteTea.png";
import tea4 from "../../img/tea/citronTea.png";
import tea5 from "../../img/tea/peppermintTea.png";
import tea6 from "../../img/tea/chamomileTea.png";
import tea7 from "../../img/tea/earlgreyTea.png";
import dessert0 from "../../img/dessert/cheeseCake.png";
import dessert1 from "../../img/dessert/tiramisuCake.png";
import dessert2 from "../../img/dessert/chocomousseCake.png";
import dessert3 from "../../img/dessert/plainCroffle.png";
import dessert4 from "../../img/dessert/icecreamCroffle.png";
import dessert5 from "../../img/dessert/coffeeBeanBread.png";
import dessert6 from "../../img/dessert/custardCreamBread.png";
import axios from "axios";
import MenuOption from "./MenuOption";

function TempPage() {
    let [coffee, setCoffee] = useState(coffeeData);
    let [bubbleTea, setBubbleTea] = useState(bubbleTeaData);
    let [frappe, setFrappe] = useState(frappeData);
    let [smoothie, setSmoothie] = useState(smoothieData);
    let [ade, setAde] = useState(adeData);
    let [juice, setJuice] = useState(juiceData);
    let [tea, setTea] = useState(teaData);
    let [dessert, setDessert] = useState(dessertData);

    let coffeeImg = [coffee0, coffee1, coffee2, coffee3, coffee4, coffee5, coffee6];
    let bubbleTeaImg = [bubbleTea0, bubbleTea1, bubbleTea2, bubbleTea3];
    let frappeImg = [frappe0, frappe1, frappe2, frappe3, frappe4];
    let smoothieImg = [smoothie0, smoothie1, smoothie2, smoothie3, smoothie4, smoothie5, smoothie6];
    let adeImg = [ade0, ade1, ade2, ade3, ade4, ade5];
    let juiceImg = [juice0, juice1, juice2];
    let teaImg = [tea0, tea1, tea2, tea3, tea4, tea5, tea6, tea7];
    let dessertImg = [dessert0, dessert1, dessert2, dessert3, dessert4, dessert5, dessert6];

    let menuImg = [coffeeImg, bubbleTeaImg, frappeImg, smoothieImg, adeImg, juiceImg, teaImg, dessertImg ];
    let menuArray = [coffee, bubbleTea, frappe, smoothie, ade, juice, tea, dessert]

    useEffect(() => {
        let setArray = [setCoffee, setBubbleTea, setFrappe, setSmoothie, setAde, setJuice, setTea, setDessert]
        let getArray = ['/getCoffee', '/getBubbleTea', '/getFrappe', '/getSmoothie', '/getAde', '/getJuice', '/getTea', '/getDessert']
        return (
            getArray.map((num, index) => {
                return (
                    axios.get(getArray[index])
                        .then((res) => {
                            setArray[index](res.data.comp)
                            /!*console.log(res.data.comp)*!/
                        })
                        .catch(( error )=>{ console.log( error ) })
                )
            })
        )
    }, [])

    const date = new Date();
    let [tabChange, setTabChange] = useState(0);
    let translate = 0;
    let slideNum = 69.56 * (parseInt((menuArray[tabChange].length) / 3));


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
                            { date.getMonth() + 1 + "??? "}
                            { date.getDate() + "???"}
                        </div>
                        <div>
                            <LiveClock format ={"HH:mm:ss"} interval = { 1000 } ticking = { true } />
                        </div>
                    </div>
                </div>
                <div className = "orderBody">
                    <div className = "menuContents">
                        <div className = "menuItems">
                            <MenuDisplayTab coffee = { coffee } coffeeImg = { coffeeImg }
                                            tabChange = { tabChange } menuArray = { menuArray } menuImg = { menuImg } />
                        </div>
                    </div>
                </div>

                <div className = "arrowBtnDiv">
                    <div className = "leftArrowBtn" onClick={() => {
                        if(translate >= -slideNum && translate < 0) {
                            /!*setTranslate(translate + 69.56)*!/
                            translate = translate + 69.56;
                            $('.menuItems').css('transform', 'translateX(' + (translate) + 'vw)');
                        }
                    }}>
                        <i className="fas fa-chevron-left fa-3x"></i>
                        <p> ?????? ????????? </p>
                    </div>
                    <div className = "rightArrowBtn" onClick = {() => {
                        if(translate > -slideNum  && translate <= 0) {
                            /!*setTranslate(translate - 69.56)*!/
                            translate = translate - 69.56;
                            $('.menuItems').css('transform', 'translateX(' + (translate) + 'vw)');
                        }
                    }}>
                        <p> ?????? ????????? </p>
                        <i className="fas fa-chevron-right fa-3x"></i>
                    </div>
                </div>
                <MenuSelectButton setTabChange = { setTabChange } translate = { translate } />
            </div>
            <div className = "rightContents">
                <div className = "recipe">
                    <div className = "recipeTop">
                        <div className = "recipeTitle">
                            <p> ????????? </p>
                            <i className="fas fa-redo-alt fa-2x"></i>
                        </div>
                        <div className = "recipeBody">
                            <div className = "recipeContent">
                                <img src = { coffeeImg[0] }/>
                                <div className = "recipeDetail">
                                    <p> ??????????????? </p>
                                    <p> 1500??? </p>
                                </div>
                                <div className = "recipeCount">
                                    <span>
                                        <i className="fas fa-caret-down fa-3x"></i>
                                    </span>
                                    <p> 5 </p>
                                    <span>
                                        <i className="fas fa-caret-up fa-3x"></i>
                                    </span>
                                </div>
                            </div>
                            <div className = "recipeContent">
                                <img src = { coffeeImg[0] }/>
                                <div className = "recipeDetail">
                                    <p> ??????????????? </p>
                                    <p> 1500??? </p>
                                </div>
                                <div className = "recipeCount">
                                    <span>
                                        <i className="fas fa-caret-down fa-3x"></i>
                                    </span>
                                    <p> 5 </p>
                                    <span>
                                        <i className="fas fa-caret-up fa-3x"></i>
                                    </span>
                                </div>
                            </div>
                            <div className = "recipeContent">
                                <img src = { coffeeImg[0] }/>
                                <div className = "recipeDetail">
                                    <p> ??????????????? </p>
                                    <p> 1500??? </p>
                                </div>
                                <div className = "recipeCount">
                                    <span>
                                        <i className="fas fa-caret-down fa-3x"></i>
                                    </span>
                                    <p> 5 </p>
                                    <span>
                                        <i className="fas fa-caret-up fa-3x"></i>
                                    </span>
                                </div>
                            </div>
                            <div className = "recipeContent">
                                <img src = { coffeeImg[0] }/>
                                <div className = "recipeDetail">
                                    <p> ??????????????? </p>
                                    <p> 1500??? </p>
                                </div>
                                <div className = "recipeCount">
                                    <span>
                                        <i className="fas fa-caret-down fa-3x"></i>
                                    </span>
                                    <p> 5 </p>
                                    <span>
                                        <i className="fas fa-caret-up fa-3x"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "recipeBottom">
                        <div className = "recipePrice">
                            <p> ?????? </p>
                            <p> 1500 ??? </p>
                        </div>
                        <Button className = "buyBtn"> ???????????? </Button>
                        <Button className = "cancelBtn"> ???????????? </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TempFunc(props) {

}

function MenuDisplayTab(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    let [clickNum, setClickNum] = useState(0)

    return (
        props.menuArray[props.tabChange].map((num, index) => {
            return (
                <>
                    <div className = "menu_Container" onClick={() => {
                        handleShow()
                        setClickNum(index)
                    }}>
                        <div className = "menuImages slide-boxes">
                            <img src = { props.menuImg[props.tabChange][index] }/>
                        </div>
                        <div className = "menuName slide-boxes">
                            <p> { props.menuArray[props.tabChange][index].title } </p>
                        </div>
                    </div>
                    {
                        /!* ????????? ????????? ???????????? ????????? ????????? *!/
                        (index + 1) === props.menuArray[props.tabChange].length
                            ?   <MenuOption show = { show } onHide = { handleClose } handleClose = { handleClose }
                                    image = { props.menuImg[props.tabChange][clickNum] }
                                    title = { props.menuArray[props.tabChange][clickNum].title }
                                    price = { props.menuArray[props.tabChange][clickNum].price } num = { clickNum }
                                />
                            :   null
                    }
                </>
            )

        })
    )
}

function MenuSelectButton(props) {
    let menu = ['??????', '?????????', '?????????', '?????????', '?????????', '??????', '???', '?????????']
    let tempArr = [0, 1, 2, 3]
    return (
        <div className = "varietyContents">
            <div className = "menuTable _top">
                {
                    tempArr.map((num, index) => {
                        return (
                            <div onClick = { () => {
                                props.translate = 0;

                                props.setTabChange(index)
                                console.log(index)
                            } }>
                                <p> { menu[index] } </p>
                            </div>
                        )
                    })
                }
            </div>
            <div className = "menuTable _bottom">
                {
                    tempArr.map((num, index) => {
                        return (
                            <div onClick = { () => {
                                props.translate = 0;
                                props.setTabChange(index + 4)
                                console.log(index + 4)
                            } }>
                                <p> { menu[index + 4] } </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TempPage;*/

import React, {useState} from 'react'
import TempPage_2 from "./TempPage_2";
import {Button} from "react-bootstrap";

function TempPage() {
    let [number, setNumber] = useState(0)

    return (
        <>
            <div>
                <h1> TempPage </h1>
                <Button onClick = {() => {
                    setNumber(number + 1)
                }}> ??? ?????? </Button>
                <h2> ??? : { number } </h2>
            </div>

        </>
    )
}

export default TempPage