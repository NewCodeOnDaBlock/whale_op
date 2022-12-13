import React, { useEffect, useState, useRef } from 'react';
import './Main.css';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'chartjs-adapter-date-fns';


const CryptoChart5 = ({ data }) => {

    const { id } = useParams();
    // const [onedaychart, setOneDayChart] = useState("");
    // const [sevendaychart, setSevenDayChart] = useState("");
    // const [oneyearchart, setOneYearChart] = useState("")
    // const [fourteendaychart, setFourteenDayChart] = useState("");
    const [onemonthchart, setOneMonthChart] = useState("");
    const [coinchartdetail, setCoinChartDetail] = useState([{}]);
    // const [coindata, setCoindata] = useState({});


    const formatData = data => {
        return data.map(el => {
            return {

                x: el[0],
                y: el[1].toFixed(2)
            }
        })
    }

    useEffect(() => {

        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`)
            .then(response => {
                // console.log("Connected to one day chart!")
                // console.log(response.data.prices)
                setOneMonthChart({

                    month: formatData(response.data.prices)

                });
            })
    }, [])



    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then(response => {
                setCoinChartDetail(response.data)
            })
    }, [])









    return (

        <div id="chart-body">

            <img src={coinchartdetail[0].image} style={{ width: 80, height: 80, marginTop: 30, marginBottom: 20 }} />
            <Line id="chart-canvas"
                data={{
                    datasets: [
                        {
                            label: `${id}'s Monthly Chart`,
                            data: onemonthchart.month,
                            backgroundColor: '#ffd166',
                            borderColor: '#ef476f',
                            pointRadius: 0,
                            borderWidth: 2,
                        },
                    ],
                }}
                height={200}
                width={500}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                stepSize: 1,
                            },
                            grid: {
                                borderColor: 'white',
                                tickColor: 'white',
                                drawTicks: true,
                                lineWidth: 1
                            },
                            distribution: 'linear',
                        },
                        y: [],
                    }
                }}
            />
            <div id="chart-nav-container">
                <div id="go-home-btn">
                    <a href="/" id="chart2home">Go Home</a>
                </div>
                <div id="timeframe-btn-container">
                    <a href={`/chart/${id}/oneday`}>
                        <button id="timeframe-btn">1dy</button>
                    </a>
                    <a href={`/chart/${id}/sevenday`}>
                        <button id="timeframe-btn">7dy</button>
                    </a>
                    <a href={`/chart/${id}/fourteenday`}>
                        <button id="timeframe-btn">14dy</button>
                    </a>
                    <a href={`/chart/${id}/month`}>
                        <button id="timeframe-btn">1mth</button>
                    </a>
                    <a href={`/chart/${id}/oneyear`}>
                        <button id="timeframe-btn">1yr</button>
                    </a>
                </div>
            </div>

        </div>
    )
}
export default CryptoChart5;