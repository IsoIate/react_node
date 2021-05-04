import React from 'react';
import {Nav} from "react-bootstrap";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import '../css/MenuContainer.css'

// 메뉴 바 모듈
function MenuContainer(props) {

    return (
        <div className="menuContainer">
            <div className = "storeBanner">
                <div className="homeBtn">
                    <p className="cursorAble" onClick={() => {
                        props.history.push("/")
                    }}><i className="fas fa-home fa-2x"></i>  처음으로</p>
                </div>

                <h1> ABC Cafe </h1>
            </div>
            <div className = "menuTitle" >      {/* 메뉴 선택 버튼 */}

                <Nav justify variant="pills"  defaultActiveKey="/home">
                    <Nav.Link className="cursorDisable" style={{paddingBottom: "0px"}}>
                        <LeftArrow menuState = { props.menuState } history = { props.history } />   {/* 메뉴 왼쪽 이동 버튼 */}
                    </Nav.Link>
                </Nav>

                <Menu menu = { props.menu } history = { props.history } />     {/* 메뉴 버튼 */}

                <Nav justify variant="pills"  defaultActiveKey="/home">
                    <Nav.Link style={{paddingBottom: "0px"}}>
                        <RightArrow menuState = { props.menuState } history = { props.history }/>
                    </Nav.Link>
                </Nav>

            </div>
        </div>
    )
}

function Menu(props) {
    return (
        props.menu.map(function (num, index) {
            return (
                <Nav justify variant="pills" className="menuSelect" defaultActiveKey="/home">
                    <Nav.Link style={{paddingBottom: "0px"}} onClick={ () => {
                        props.history.push("./" + index)
                    }}>
                        <p className = "menu" > { props.menu[index] } </p>
                    </Nav.Link>
                </Nav>
            )
        })
    )
}

export default MenuContainer;