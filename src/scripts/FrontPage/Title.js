import React, {useState} from "react";
import Admin from "../../img/Admin.png"
import logo from "../../img/cafelogo.png";
import '../../css/FrontPage/Title.css'
import AdminModal from "./AdminModal";

function Title(props) {

    const [Show, setShow] = useState(false);
    const Close = () => setShow(false);
    const Open = () => setShow(true);

    return (
        <div className = "frontDiv">
            <div className ={ props.pageCheck !== 'mainPage' ? "frontLink" : "mainLink"}>
                <div className = "frontTitle">
                    <img className = "frontLogoImg" src = { logo } onClick={() => {
                        Open();
                    }}/>
                    <h1> Coffee House </h1>
                </div>
            </div>

            {
                Show === true ?
                    < AdminModal show = { Show } onHide = { Close } />
                    : null
            }
        </div>
    )
}

export default Title
