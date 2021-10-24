import React, {useEffect, useState} from 'react';
import axios from "axios";

function RecentRevenue(props) {

    let [data, setData] = useState(null);

    /* getRevenue라는 url로 접속했을 때 아래 코드 실행 */
    useEffect(() => {

        axios.get('/getRevenue')

            .then(( res ) => {
                setData(res.data.comp)
                /*console.log(res.data.comp)*/
            })
            .catch(( error )=>{ console.log( error ) })

    }, [])


    return (
        <>
            <>
                <div className = { props.callPage == 1 ? "tableDiv1" : "tableDiv2" } >
                    <table className="table table-striped table-bordered revenueTable ">
                        <tr className = "tableHeader" >
                            <th onClick = {() => {

                            }}> # </th>
                            <th> 메뉴명 </th>
                            <th> 수량 </th>
                            <th> 가격 </th>
                        </tr>
                        {
                            data != null
                                ? <Reverse data = { data } callPage = { props.callPage } />
                                : null
                        }
                    </table>
                </div>
            </>
        </>
    )
}

function Reverse (props) {
    return (
        props.data.reverse().map((num, index) => {
            return (
                index < 3
                    ? <TableBody data = { props.data } index = { index } />
                    : null
            )
        })
    )
}

function TableBody(props) {
    return (
        <>
            <tr className = "tableBody">
                <td>
                    { props.data[props.index]._id }
                </td>
                <td>
                    { props.data[props.index].메뉴이름 }
                </td>
                <td>
                    { props.data[props.index].수량 }
                </td>
                <td>
                    { props.data[props.index].가격 }
                </td>
            </tr>
        </>
    )
}

export default RecentRevenue;