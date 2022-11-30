import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import ActivitiesCreate from "./Components/ActivitiesCreate"
// import CardDetail from "./Components/CardDetail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home"  component={Home}/>
          <Route path="/activities" component={ActivitiesCreate}/>
          {/* <Route path="/home/:id" component={CardDetail} */}
        </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
