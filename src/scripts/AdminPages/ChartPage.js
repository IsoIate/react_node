import React, {useEffect, useState} from 'react'
import '../../css/AdminPages/TempPage.css'
import Chart from 'react-apexcharts';

function ChartPage (props) {
    /* 총 매출 차트 */
    let totalRevenue = {
        options : {
            series: [],
            chart: {
                type: 'line',
                toolbar: {
                    show: false
                },
                zoom: false,
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
                categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            }
        }
    }

    /* 결제 방법 차트 */
    let payments = {
        options : {
            series: [],
            chart: {
                type: 'donut',
                offsetY: 10,
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
                    offsetY: 15,
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
                offsetY: 5,
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

    /* 방문 손님 차트 */
    let visitors = {
        options : {
            series: [{
                name: '방문객 수',
                data: [2, 3, 6, 1, 10, 7, 3]
            }],
            chart: {
                type: 'bar',
                offsetX: -20,
                offsetY: 20,
                toolbar: {
                    show: false
                },
            },
            title: {
                text: '일일 방문객 수',
                offsetY: -5,
                align: 'center',
                style: {
                    fontSize: "24px",
                    color: '#444'
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: ["일", "월", "화", "수", "목", "금", "토"],
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    show: false,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "명";
                    }
                }

            },
        }
    }

    /* 매출 Top 차트 */
    let topRevenue = {
        options : {
            series: [{
                name: "판매량",
                data: [14, 8, 6]
            }],
            chart: {
                type: 'bar',
                offsetX: -10,
                width: 10,
                height: 'auto',
                toolbar: {
                    show: false
                },
            },
            title: {
                text: '최고 매출',
                offsetY: 10,
                align: 'center',
                style: {
                    fontSize: "24px",
                    color: '#444'
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    horizontal: true,
                    barHeight: '50%',
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['아메리카노', '카라멜 마끼아또', '초코케익'],
                title: {
                    style: {
                        fontSize: '24px',
                        fontFamily: 'Helvetica, Arial, sans-serif',

                    },
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (val) {
                        return val;
                    },
                    style: {
                        fontSize: "14px",
                        fontWeight: 'bold'
                    }
                }
            }
        }
    }

    /* 매출 차트에 값 삽입 */
    if(props.monthRev != null) {
        let revenue = []
        for(let i = 0; i < 12; i++) {
            revenue[i] = props.monthRev[i].revenue
        }
        totalRevenue.options.series.push({
            name : "매출",
            data : revenue
        })
    }

    /* 결제방법 차트에 값 삽입 */
    if(props.payment != null) {
        payments.options.series.push(parseInt(props.payment.payData.cash), parseInt(props.payment.payData.card))
    }

    return (
        <div className = "temp_bodyDiv">
            <div className = "bodyTopDiv">
                <div className = "totalRevenue">
                    <div className = "revenueChart">
                        <Chart options={totalRevenue.options} series={totalRevenue.options.series} type="line"
                               width="200%" height="150%"/>
                    </div>
                </div>
                <div className = "payHistory">
                    <Chart options={payments.options} series={payments.options.series} type="donut"
                           width="100%" height="100%"/>
                </div>
            </div>
            <div className = "bodyBottomDiv">
                <div className = "visitors">
                    <Chart options={visitors.options} series={visitors.options.series} type="bar"
                           width="100%" height="150%"/>
                </div>
                <div className = "topRevenue">
                    <Chart options={topRevenue.options} series={topRevenue.options.series} type="bar"
                           width="100%" height="100%"/>
                </div>
            </div>
        </div>
    )
}



export default ChartPage;
