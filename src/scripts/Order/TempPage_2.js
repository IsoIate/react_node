import React from 'react'

function TempPage_2(props) {
    return (
        <>
            <div>
                <h1> TempPage_2 </h1>
                <h3> 부모 컴포넌트의 값 출력 </h3>
                <h4> 부모에게서 받아온 값 : { props.number } </h4>
            </div>
        </>
    )
}

export default TempPage_2