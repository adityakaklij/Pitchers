
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SubmitProject from './Components/SubmitProject';
import Products from './Components/Products';


function App() {
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


          
        </Switch>

    </div>
    </HashRouter>
    </>
  );
}

export default App;
