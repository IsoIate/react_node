import React, {useEffect, useState} from 'react'
import { Button, Jumbotron } from "react-bootstrap";
import '../../css/AdminPages/TempPage.css'
import LeftNav from "./LeftNav";
import AdminNav from "./AdminNav";
import Chart from 'react-apexcharts';


function TempPage () {
    let revenue = [10, 41, 35, 51, 49, 62, 69, 91, 148];
    let totalRevenue = {
        options : {
            series: [],
            chart: {
                type: 'line',
                toolbar: {
                    show: false
                },
                offsetY: 30,
                margin: 20
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: '총 매출',
                align: 'center',
                offsetY: -5,
                style: {
                    fontSize: "30px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "bold",
                    marginTop: "20px"
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        }
    }

    let payments = {
        options : {
            series: [70, 30],
            chart: {
                type: 'donut',
                offsetX: -20,
                offsetY: 30,
                margin: 20,
            },
            title: {
                text: '결제 방법',
                align: 'center',
                offsetY: -5,
                style: {
                    fontSize: "30px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "bold",
                }
            },
            labels: ['현금', '카드'],
            plotOptions: {
                pie: {
                    offsetY: 30,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: "24px",
                            },
                            value: {
                                offsetY: -1,
                                show: true,
                                fontSize: "24px",
                            },
                            total: {
                                show: true,
                                fontSize: "28px",
                                color: "black"
                            }
                        }
                    }
                }
            },
            legend: {
                position: 'bottom',
                fontSize: "20px",
                offsetY: 20,
            },
            dataLabels: {
                enabled: true,
                formatter(val) {
                    return [val.toFixed(0) + '%']
                },
                style: {
                    fontSize: "18px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "bold"
                },
            },
        }
    }
    /* 차트에 값 삽입 */
    totalRevenue.options.series.push({
        name : "매출",
        data : revenue
    })

    return (
        <div>
            <div className = "revenueDiv">
                <LeftNav/>

                <div className="container mt-3" className = "rightDiv">
                    <AdminNav/>

                    <div className = "bodyDiv">
                        <div className = "bodyTopDiv">
                            <div className = "totalRevenue">
                                <div className = "revenueChart">
                                    <Chart options={totalRevenue.options} series={totalRevenue.options.series} type="line"
                                           width="200%" height="150%"/>
                                </div>
                            </div>
                            <div className = "payHistory">
                                <Chart options={payments.options} series={payments.options.series} type="donut"
                                       width="500px" height="100%"/>
                            </div>
                        </div>
                        <div className = "bodyBottomDiv">
                            <div className = "visitors">
                                <p> 방문 손님 </p>
                            </div>
                            <div className = "topRevenue">
                                <p> 매출 1위 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default TempPage;