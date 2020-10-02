import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchScreen from './containers/SearchScreen';
import ResultsScreen from './containers/ResultsScreen';

function App() {
  return (
    <div className="main-container">
      <Router>
        <Switch>
          <Route exact path="/" component={SearchScreen} />
          <Route path="/results/:id" component={ResultsScreen} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;