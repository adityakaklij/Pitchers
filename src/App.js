
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SubmitProject from './Components/SubmitProject';
import Products from './Components/Products';
import Pitches from './Components/Pitches';
import AboutShark from './Components/AboutShark';
import { useEffect, useState } from 'react';
import OnBoardSharks from './Components/OnBoardSharks';
import PushChatTest from './Components/PushChatTest';


function App() {

  const [isWalletInstalled, setIsWalletInstalled] = useState(false)
  const [account, setAccount] = useState(null)

  useEffect( () =>{
    if(window.ethereum){
      setIsWalletInstalled(true);
      connectWallet()
    }
  },[]);

  const connectWallet = async() =>{
    window.ethereum.request( {method: "eth_requestAccounts"})
    .then((accounts) => {
      setAccount(accounts[0]);
    }).catch( (e) => {
      alert(e)
    })
}

if(account === null){
  return (
    <div className="App">
      {
        isWalletInstalled ? (<button onClick={connectWallet} >Connect</button>) : (
          <p>Please Install Metamask Wallet first :) </p>
        )
      }
    </div>
  )
}
else {
  return (
    <>
      <HashRouter basename='/'>
    <div className="App">
       <Navbar/>

      <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/SubmitProject">
            <SubmitProject/>
          </Route>

          <Route exact path="/Products">
            <Products/>
          </Route>

          <Route exact path="/Pitches">
            <Pitches/>
          </Route>

          <Route exact path="/AboutShark">
            <AboutShark/>
          </Route>

          <Route exact path="/OnBoardSharks">
            <OnBoardSharks/>
          </Route>

          <Route exact path="/PushChatTest">
            <PushChatTest/>
          </Route>


          
        </Switch>

    </div>
    </HashRouter>
    </>
  );
}
}

export default App;
