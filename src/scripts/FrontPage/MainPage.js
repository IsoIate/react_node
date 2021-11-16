/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import { Jumbotron, Button, Card } from "react-bootstrap";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import $ from 'jquery'

import '../../css/FrontPage/MainPage.css'
import banner_01 from '../../img/banner/banner_01.jpg'
import banner_02 from '../../img/banner/banner_02.jpg'
import banner_03 from '../../img/banner/banner_03.jpg'
import Title from "./Title";
import {useDispatch} from "react-redux";

function MainPage() {
    let history = useHistory();
    let pageCheck = 'mainPage'
    let dispatch = useDispatch();
    let [imgNum, setImgNum] = useState(0);

    return (
        <div className = "mainPage">
            <div className = "mainPageHeader">
                <Title pageCheck = { pageCheck } />
            </div>
            <div className = "mainPageBody">
                <div className = "main_slideContainer">
                    <div className = "main_slideBox">
                        <img src = { banner_01 } />
                    </div>
                    <div className = "main_slideBox">
                        <img src = { banner_02 } />
                    </div>
                    <div className = "main_slideBox">
                        <img src = { banner_03 } />
                    </div>
                </div>
            </div>
            <div className = "mainPageFooter">
                <Button className = "orderBtn" size="lg" onClick={() => {
                    /*timer(imgNum, setImgNum)
                    $('.main_slideContainer').css('-webkit-animation-name','slideAnimation');*/
                    history.push('/order');
                }}> 주문하기 </Button>
                <Button className = "orderBtn" size="lg" onClick={() => {
                    dispatch({type : "모달 추가"})
                    history.push('/SimpleOrder');
                }}> 더 쉽게 주문하기 </Button>
            </div>
            {/*<Card className="text-center" style={{height: "150vw", width: "100vw"}}>
                <Card.Body >
                    <img className= " mainImg " src = { mainImg } />
                </Card.Body>
                <Card.Footer className="text-muted">
                    <div className="row" style={{ marginBottom: "20px" }}>
                        <div className="col-md-6">
                            <Link as={ Link } to={ "/order" }>
                                <Button className = "orderBtn" size="lg"> 주문하기 </Button>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link as={ Link } to={ "/SimpleOrder/0" }>
                                <Button className = "simpleOrderBtn" size="lg"> 더 쉽게 주문하기 </Button>
                            </Link>
                        </div>
                    </div>
                </Card.Footer>
            </Card>*/}
        </div>
    );
}

function timer(imgNum, setImgNum) {
    console.log(imgNum)
    setTimeout(() => {
        if(imgNum <= -200) {
            setImgNum(0)
        }
        else {
            setImgNum(imgNum - 100)
        }
    }, 3000)
}

export default MainPage
