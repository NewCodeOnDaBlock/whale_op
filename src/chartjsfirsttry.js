// import React, { useEffect, useState, useRef } from 'react';
// import './Main.css';
// import Chart from 'chart.js/auto';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// // import 'chartjs-adapter-date-fns';
// // import { chartOptions } from '../chartconfigs/chartConfigs';

// // import logo from '/Users/radenlmantuano/Desktop/mern_projects/whale_op/client/src/components/images/PngItem_371654.png';
// // import axios, { Axios } from 'axios';
// // import { useHistory } from 'react-router-dom';
// // import io from 'socket.io-client';

// // const CryptoChart = (props) => {

// //     const { id } = useParams();
// //     const [onedaychart, setOnedaychart] = useState([]);
// //     // const [sevendaychart, setSevendaychart] = useState([]);
// //     // const [oneyearchart, setOneyearchart] = useState([]);

// //     //[0] === day [1] === price
// //     useEffect(() => {
// //         axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
// //             .then(response => {
// //                 console.log("Connected to one day chart!")
// //                 console.log(response.data.prices);
// //                 console.log(response.data.prices);
// //                 setOnedaychart(response.data.prices);
// //             })
// //     }, [onedaychart])



//     const chartRef = useRef(); 

//     useEffect(() => {
//         if (chartRef && chartRef.current) { 
//             const chartObject = new Chart(chartRef.current, {
//                 type: 'line',
//                 data: {

//                     datasets: [
//                         {
//                             label: `${id} Chart`,
//                             lineTension: 0.1,
//                             data: [onedaychart[1]],
//                             backgroundColor: '#ffd166',
//                             borderColor: '#ef476f',
//                             pointRadius: 0,
//                             borderWidth: 1,
//                         }
//                     ],
//                 },
//                 options: {
//                     lineHeightAnnotation: {
//                         always: true,
//                         hover: false,
//                         lineWeight: 1.5
//                     },

//                     animation: {
//                         duration: 2000,
//                     },

//                     maintainAspectRatio: false,
//                     responsive: true,
//                     scales: {
//                         x: {
//                             type: 'time',
//                             grid: {
//                                 borderColor: 'white',
//                                 tickColor: 'white',
//                                 drawTicks: true,
//                                 lineWidth: 3
//                             },
//                             distribution: 'linear',

//                         },
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });
//         }
//     }, [chartRef])

//     return (


//         <div id="chart-body">

//             <img src={id.image} />
//             {JSON.stringify(onedaychart[0])}<br></br>
//             {JSON.stringify(onedaychart[1])}

//             <div id="chart-canvas">
//                 <canvas ref={chartRef} id="myChart" width={600} height={350}></canvas>
//             </div>

//             <a href="/" id="chart2home">
//                 Go back
//             </a>
//         </div>
//     )
// }
// export default CryptoChart;