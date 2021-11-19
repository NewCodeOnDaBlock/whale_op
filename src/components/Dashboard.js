import React, { useEffect, useState } from 'react';
import './Main.css';
import logo from '/Users/radenlmantuano/Desktop/mern_projects/whale_op/client/src/components/images/PngItem_371654.png';
import axios, { Axios } from 'axios';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
// import * as io from 'socket.io-client';

const Dashboard = (props) => {

    const [socket] = useState(() => io(":8000"))
    const history = useHistory();
    const [coinname, setCoinname] = useState("");
    const [onloadcoindata, setOnloadcoindata] = useState([{}])
    const [onloadcoincap, setOnloadcoincap] = useState([]);
    const [onloadcoinvolume, setOnloadcoinvolume] = useState([]);
    const [coindata, setCoindata] = useState([{}]);
    const [searcherror, setSearcherror] = useState("");
    const [messageerror, setMessageerror] = useState("");
    const [chatinput, setChatinput] = useState("");
    const [messages, setMessages] = useState([]);
    const [tweeterror, setTweetError] = useState("");
    const [toptrendinglist, setTopTrendingList] = useState([]);
    // const [timeframe, setTimeframe] = useState("1h");


    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
    let ethws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
    let solws = new WebSocket('wss://stream.binance.com:9443/ws/solusdt@trade');
    let shibws = new WebSocket('wss://stream.binance.com:9443/ws/shibusdt@trade');
    let manaws = new WebSocket('wss://stream.binance.com:9443/ws/manausdt@trade');
    let lastbtcPrice = null;
    let lastethPrice = null;
    let lastsolPrice = null;
    let lastshibPrice = null;
    let lastmanaPrice = null;

    ws.onmessage = (e) => {

        let coinObject = JSON.parse(e.data);
        let btcprice = parseFloat(coinObject.p).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        document.querySelector("#btc-ticker").innerText = btcprice;
        document.querySelector("#btc-ticker").style.color = !lastbtcPrice || lastbtcPrice === btcprice ? 'white' : btcprice > lastbtcPrice ? 'green' : 'red';
        lastbtcPrice = btcprice;
    }

    ethws.onmessage = (e) => {

        let coinObjecteth = JSON.parse(e.data);
        let ethprice = parseFloat(coinObjecteth.p).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        document.querySelector("#eth-ticker").innerText = ethprice;
        document.querySelector("#eth-ticker").style.color = !lastethPrice || lastethPrice === ethprice ? 'white' : ethprice > lastethPrice ? 'green' : 'red';
        lastethPrice = ethprice;
    }

    solws.onmessage = (e) => {

        let coinObjectsol = JSON.parse(e.data);
        let solprice = parseFloat(coinObjectsol.p).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        // console.log(coinObjectsol)
        document.querySelector("#sol-ticker").innerText = solprice;
        document.querySelector("#sol-ticker").style.color = !lastsolPrice || lastsolPrice === solprice ? 'white' : solprice > lastsolPrice ? 'green' : 'red';
        lastsolPrice = solprice;

    }

    shibws.onmessage = (e) => {

        let coinObjectshib = JSON.parse(e.data);
        let shibprice = parseFloat(coinObjectshib.p).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 8 });
        // console.log(coinObjectshib)
        document.querySelector("#shib-ticker").innerText = shibprice;
        document.querySelector("#shib-ticker").style.color = !lastshibPrice || lastshibPrice === shibprice ? 'white' : shibprice > lastshibPrice ? 'green' : 'red';
        lastshibPrice = shibprice;

    }

    manaws.onmessage = (e) => {

        let coinObjectmana = JSON.parse(e.data);
        let manaprice = parseFloat(coinObjectmana.p).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 });
        // console.log(coinObjectmana)
        document.querySelector("#mana-ticker").innerText = manaprice;
        document.querySelector("#mana-ticker").style.color = !lastmanaPrice || lastmanaPrice === manaprice ? 'white' : manaprice > lastmanaPrice ? 'green' : 'red';
        lastmanaPrice = manaprice;
    }


    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=decentraland&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(response => {
                setOnloadcoincap(response.data[0].market_cap.toLocaleString())
                setOnloadcoinvolume(response.data[0].total_volume.toLocaleString())
                setOnloadcoindata(response.data)
            })
    }, [])


    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/search/trending')
            .then(response => {
                console.log(response.data.coins);
                setTopTrendingList(response.data.coins);
            })
    }, [])




    const coinNameinput = (e) => {
        setCoinname(e.target.value);

    }

    const searchCoin = (e) => {
        e.preventDefault();

        if (coinname.length < 1) {
            console.log("Coin name is required!");
            setSearcherror("Coin name is required!");

        } else {
            axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinname.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                .then(response => { setCoindata(response.data) })
            setCoinname("");
            setSearcherror("");
            history.push(`/search/${coinname}`)
            console.log("Coin Searched");

        }
    }


    const openChat = (e) => {
        document.querySelector("#join-chat-ask").style.display = "none";
        document.querySelector("#chat-content").style.display = "block";
        document.querySelector("#form-hugger").style.display = "block";

    }


    useEffect(() => {
        console.log("chat front end is connected!")
        socket.on('post msg', msg => {
            setMessages(previousmessages => { return [...previousmessages, msg] })
        })
        return () => socket.disconnect(true);
    }, [socket]);



    useEffect(() => {
        console.log("twitter socket front end is connected!")
        socket.on('tweet', (tweet) => {
            // console.log(tweet);
            if (!tweet) {
                setTweetError("Loading Real Time Tweets..")
            } else {

                const tweetData = {
                    id: tweet.data.id,
                    username: `@${tweet.includes.users[0].username}`,
                    text: tweet.data.text
                }
                const tweetElement = document.querySelector("#twitter-box");

                tweetElement.innerHTML = `<div class="card-body">
                                                <h5>${tweetData.text}</h5>
                                                <h6>${tweetData.username}</h6>
                                        </div>
                                        
                                        <a style='width: 100%' href="https://twitter.com/${tweetData.username}/status/${tweetData.id}">
                                        <button style='background-color: #0096c7'>Go To Tweet
                                        </button> 
                                        </a>`
            }
        })
    }, [socket])




    const chatInput = (e) => {
        setChatinput(e.target.value);
    }

    const submitChatmessage = (e) => {
        e.preventDefault();

        if (chatinput.length < 1) {
            console.log("Message is required!");
            setMessageerror("Message is required!");
        } else {

            socket.emit('chatmessage', chatinput)
            document.querySelector("#initialchatmesage").style.display = "none";
            setChatinput("");
            setMessageerror("");

        }
    }


    return (
        <div>
            <div id="nav-bar-container">
                <div id="navbar-left">
                    <img src={logo} id="whale-img" />
                    <p><em>"A simple coin tracker made for whales"</em></p>
                </div>


                <div id="navbar-middle">
                    {
                        searcherror ?
                            <p id="alert">{searcherror}</p> : ''
                    }
                    <form onSubmit={searchCoin}>
                        <input type="text" id="search-input" placeholder="Coin Lookup..." onChange={coinNameinput} value={coinname} />
                        <button id="search-btn">Search</button>
                    </form>
                </div>


                <div id="navbar-right">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                            <a href="#">News</a>
                            <a href="#">More</a>
                        </li>
                    </ul>

                </div>
            </div>
            <div id="price-ticker-container">
                <div id="priceticker-hugger">
                    <div id="price-ticker-body">
                        <h3 id="price-ticker-title">BTC/USDT</h3>
                        <p id="btc-ticker" className="price-detail"> </p>
                    </div>
                    <div id="price-ticker-body">
                        <h3 id="price-ticker-title">ETH/USDT</h3>
                        <p id="eth-ticker" className="price-detail"> </p>
                    </div>
                    <div id="price-ticker-body">
                        <h3 id="price-ticker-title">SOL/USDT</h3>
                        <p id="sol-ticker" className="price-detail"> </p>
                    </div>
                    <div id="price-ticker-body">
                        <h3 id="price-ticker-title">SHIB/USDT</h3>
                        <p id="shib-ticker" className="price-detail"> </p>
                    </div>
                    <div id="price-ticker-body">
                        <h3 id="price-ticker-title">MANA/USDT</h3>
                        <p id="mana-ticker" className="price-detail"> </p>
                    </div>
                </div>
            </div>

            <div id="maindash-container">
                <div id="dashboard-left">
                    <h3 style={{ color: 'white' }}>Real Time News</h3>
                    <div id="twitter-box">


                    </div>

                </div>
                <div id="dashboard-middle">
                    {
                        coindata[0].image && coindata[0].id && coindata[0].symbol ?
                            <div id="coinsearch-header">

                                <img src={coindata[0].image} id="coin-logo" alt="" />
                                <h3 id="coinsearch-title">{coindata[0].id} | {coindata[0].symbol} </h3>
                            </div>

                            :

                            <div id="coinsearch-header">

                                <img src={onloadcoindata[0].image} id="coin-logo" alt="" />
                                <h3 id="coinsearch-title">{onloadcoindata[0].id} | {onloadcoindata[0].symbol} </h3>
                            </div>
                    }


                    {
                        coindata[0].current_price && coindata[0].price_change_percentage_24h && coindata[0].market_cap && coindata[0].total_volume ?

                            <div id="coinsearch-results">
                                <div id="coinsearch-result">
                                    <h4>Price</h4>
                                    {
                                        coindata[0].current_price < 0.1 ?
                                            <p>$ {coindata[0].current_price}</p> : <p>$ {coindata[0].current_price.toLocaleString()}</p>
                                    }
                                </div>
                                <div id="coinsearch-result">
                                    <h4>24h %</h4>
                                    {
                                        coindata[0].price_change_percentage_24h < 0 ?
                                            <p style={{ color: "red" }}> {coindata[0].price_change_percentage_24h.toFixed(2)} % </p>
                                            : null
                                    }
                                    {
                                        coindata[0].price_change_percentage_24h > 0 ?
                                            <p style={{ color: "green" }}> {coindata[0].price_change_percentage_24h.toFixed(2)} % </p>
                                            : null
                                    }
                                </div>
                                <div id="coinsearch-result">
                                    <h4>Mrkt Cap</h4>
                                    <p>${coindata[0].market_cap.toLocaleString()}</p>
                                </div>
                                <div id="coinsearch-result">
                                    <h4>Total Volume</h4>
                                    <p>${coindata[0].total_volume.toLocaleString()}</p>
                                </div><br></br>
                                <a href={`/chart/${coindata[0].id}/oneday`} id="see-chart">See Chart</a>
                            </div>


                            :

                            <div id="coinsearch-results">
                                <div id="coinsearch-result">
                                    <h4>Price</h4>
                                    <p>$ {onloadcoindata[0].current_price}</p>
                                </div>
                                <div id="coinsearch-result">
                                    <h4>24h %</h4>
                                    {
                                        onloadcoindata[0].price_change_percentage_24h < 0 ?
                                            <p style={{ color: "red" }}> {onloadcoindata[0].price_change_percentage_24h.toFixed(2)} % </p>
                                            : null
                                    }
                                    {
                                        onloadcoindata[0].price_change_percentage_24h > 0 ?
                                            <p style={{ color: "green" }}> {onloadcoindata[0].price_change_percentage_24h.toFixed(2)} % </p>
                                            : null
                                    }
                                </div>
                                <div id="coinsearch-result">
                                    <h4>Mrkt Cap</h4>
                                    <p>${onloadcoincap}</p>
                                </div>
                                <div id="coinsearch-result">
                                    <h4>Total Volume</h4>
                                    <p>${onloadcoinvolume}</p>
                                </div><br></br>
                                <a href={`/chart/${onloadcoindata[0].id}/oneday`} id="see-chart">See Chart</a>
                            </div>
                    }


                </div>
                <div id="dashboard-right">
                    <div id="join-chat-ask">
                        <h4 style={{ color: "white" }}>Would you like to join the chatroom? </h4>
                        <button id="joinchat-btn" onClick={openChat}>Join Chat</button>
                    </div>


                    <div id="chat-content">
                        <p id="initialchatmesage">Start chatting...</p>


                        {
                            messages.map((msgitem, i) => {
                                return <p key={i}><b>Guest:</b> {msgitem}</p>
                            })
                        }

                    </div>

                    <div id="form-hugger">
                        <form onSubmit={submitChatmessage} id="chat-form">
                            <input type="text" name="msg" autoComplete="off" onChange={chatInput} value={chatinput} placeholder="Type something here..." />
                            <button>Send</button>
                        </form>
                        {
                            messageerror ?
                                <p id="alert">{messageerror}</p> : ''
                        }
                    </div>
                </div>
            </div>
            <div id="footer-container">
                <div>
                    <h4>See What's Trending!</h4>
                </div>
                <div id="trending-container">
                    {
                        toptrendinglist ?
                            toptrendinglist.map((coin, index) => (

                                coin.item.id ?
                                    <div id="trending-coin">
                                        <img src={coin.item.small} alt={coin.item.id} />
                                        <p>{coin.item.id}</p>
                                    </div>
                                    : <p>Loading...</p>
                            ))
                            : <p>Loading...</p>
                    }

                </div>
            </div>
        </div>
    )
}
export default Dashboard;