import React, { useReducer, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartView from './containers/StartView';
import ResultsScreen from './containers/ResultsScreen';
import DetailedView from './containers/DetailedView';
import AuthView from './containers/AuthView';

function reducer(state, action) {
  if(action.type === 'set-cities')  {
    console.log(action.citiesData)
    return { cities: [...state.cities, action.citiesData]}
  }
}

function App() {
  const [{cities}, dispatch] = useReducer(reducer, {cities: []});

  useEffect(() => {
    const db = firebase.firestore()
    return db.collection('cities').onSnapshot((snapshot) => {
      const citiesData = [];
      snapshot.forEach(doc => citiesData.push(({ ...doc.data(), id: doc.id })));
      dispatch({type: 'set-cities', citiesData});
    })
  }, [])

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
