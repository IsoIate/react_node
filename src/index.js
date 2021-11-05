import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './scripts/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js"
import { Provider } from 'react-redux'
import {combineReducers, createStore} from 'redux'
import { positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

/* defaultParameter */
let primaryState = [];
let orderState = [0, 0];
let optionState = [0, 0, 0, 0];
let receiptState = [];
let detailState = [];
let counterConfirmState = [];

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
};

let store = createStore(combineReducers({
    reducer, orderReducer, optionReducer, counterConfirmReducer, detailReducer
}));

/* 주문 표 생성, 제거 */
function reducer(state = primaryState, action) {
    if(action.type === "항목추가") {
        let copy = [...state];

        copy.push(action.payload)
        console.log(copy)
        /* 같은 메뉴인지 검사, 같은 메뉴일 시 수량, 가격 합산 */
        /*for(let index = 0; index < copy.length; index++) {
            if((copy[index].title == action.payload.title)) {
                check = true;
                (copy[index].count = copy[index].count + action.payload.count);
                (copy[index].price = copy[index].price + action.payload.price);
            }
        }

        if(check != true) {
            copy.push(action.payload)
        }*/

        return copy;
    }
    else if (action.type === "항목제거") {
        let copy = [...state];
        let temp = action.payload;
        copy.splice(temp, 1);
        return copy;
    }
    else if (action.type === "항목초기화") {
        let copy = [...state];
        copy.splice(0)
        console.log(copy)
        return copy;
    }
    else {
        return state;
    }

}

/* 결제 내용 계산기 */
function orderReducer(state = orderState, action) {
    if(action.type === "주문추가") {
        let copy = [...state];

        copy[0] += action.payload.count;
        copy[1] += action.payload.price;

        return copy;
    }
    else if (action.type === "주문제거") {
        let copy = [...state];
        let tempCount = action.payload.count;
        let tempPrice = action.payload.price;

        copy[0] -= tempCount;
        copy[1] -= tempPrice;
        return copy;
    }
    else {
        return state
    }

}

/* 옵션 설정, 초기화 */
function optionReducer(state = optionState, action) {
    if (action.type === "사이즈변경") {
        let copy = [...state];
        copy[0] = action.payload;
        return copy;
    }
    else if (action.type === "얼음변경") {
        let copy = [...state];
        copy[1] = action.payload;
        return copy;
    }
    else if (action.type === "시럽변경") {
        let copy = [...state];
        copy[2] = action.payload;
        return copy;
    }
    else if (action.type === "포장변경") {
        let copy = [...state];
        copy[3] = action.payload;
        return copy;
    }
    else {
        return state
    }
}

/* 카운터 주문 테이블 */
function detailReducer(state = detailState, action) {
    if(action.type === "값 전송") {
        let copy = [...state];
        let jsonArray = new Array();
        let tempData = action.payload.data;
        let tempTotal = action.payload.total;

        console.log("detail?")
        console.log(tempData)

        for(let i = 0; i < action.payload.data.length; i++) {
            let data = new Object();

            data.title = tempData[i].title;
            data.count = tempData[i].count;
            data.price = tempData[i].price;
            data.options = tempData[i].options;
            data.menuIndex = tempData[i].menuIndex;
            data.totalPrice = tempTotal.price;
            data.totalCount = tempTotal.count;


            /*data.payment = action.payload.payment[2];*/

            jsonArray.push(data);
        }

        let result = JSON.stringify(jsonArray);
        result = JSON.parse(result);
        console.log(result)

        copy.push(result);
        return copy;
    }
    else if (action.type === "값 삭제") {
        let copy = [...state];

        copy.splice(0);
        console.log("삭제 완료")
        console.log(copy);
        console.log(state);

        return copy;
    }
    else if (action.type === "값 확인") {
        let copy = [...state];
        console.log(copy)
        console.log(state);

        return copy;
    }
    else {
        return state;
    }
}

/* 카운터에서 매출로 전송 */
function counterConfirmReducer(state = counterConfirmState, action) {
    if(action == null) {
        return 0
    }

    return 0;
}

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store = { store } template={AlertTemplate} {...options}>
            <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
