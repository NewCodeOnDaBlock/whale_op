import './App.css';
// import Main from './Main';
import Dashboard from './components/Dashboard';
import CryptoChart from './components/CryptoChart';
import CryptoChart2 from './components/CryptoChart2';
import CryptoChart3 from './components/CryptoChart3';
import CryptoChart4 from './components/CryptoChart4';
import CryptoChart5 from './components/CryptoChart5';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Link to="/"></Link>
      <Link to="/chart/id/oneday"></Link>
      <Link to="/search/coinname"></Link>

      <Switch>
        <Route path="/search/:coinname">
          <Dashboard />
        </Route>
        <Route path="/chart/:id/oneday">
          <CryptoChart />
        </Route>
        <Route path="/chart/:id/sevenday">
          <CryptoChart2 />
        </Route>
        <Route path="/chart/:id/fourteenday">
          <CryptoChart4 />
          </Route>
          <Route path="/chart/:id/month">
          <CryptoChart5 />
          </Route>
        <Route path="/chart/:id/oneyear">
          <CryptoChart3 />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>



      </Switch>



    </BrowserRouter>
  );
}

export default App;
