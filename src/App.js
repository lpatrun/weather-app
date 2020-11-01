import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartView from './containers/StartView';
import ResultsScreen from './containers/ResultsScreen';
import DetailedView from './containers/DetailedView';
import AuthView from './containers/AuthView';

function App() {


  return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={StartView} />
          <Route path="/results/:id" component={ResultsScreen} />
          <Route path="/details/name=:name" component={DetailedView} />
          <Route path="/authorisation" component={AuthView} />
          <Route path="*" component={StartView} />
        </Switch>
      </Router>
  )
}

export default App;