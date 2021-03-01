import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import StartView from "./containers/StartView";
import ResultsView from "./containers/ResultsView";
import DetailedView from "./containers/DetailedView";
import AuthView from "./containers/AuthView";
import SearchView from "./containers/SearchView";
import ProfileView from "./containers/ProfileView";

import firebase from "./firebase";
import { auth } from "./firebase";
import { createContext } from "react";
import { reducer } from "./context/CityContext";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, {
    cities: [],
    selectedCity: -1,
    userData: null,
    loadingUser: false
  });

  useEffect(() => {
    const db = firebase.firestore();

    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "logUserIn", payload: { userData: user } });
      }
    });

    if (state.userData) {
      return db
        .collection("cities")
        .doc(state.userData.uid)
        .collection("userCities")
        .onSnapshot((snapshot) => {
          dispatch({ type: "saveSnapshot", payload: { cities: snapshot } });
          let counter = 0;
          snapshot.forEach((city) => {
            counter++;
          });
          counter
            ? dispatch({ type: "setSelectedCity", payload: { index: 0 } })
            : dispatch({ type: "setSelectedCity", payload: { index: -1 } });
        });
    }
  }, [state.userData]);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <UserContext.Provider value={{ state, dispatch }}>
          {state.userData ? (
            <Switch>
              <Route path="/" exact component={StartView} />
              <Route path="/search/:id" component={ResultsView} />
              <Route path="/search" component={SearchView} />
              <Route path="/details" component={DetailedView} />
              <Route path="/authorisation" component={AuthView} />
              <Route path="/profile" component={ProfileView} />
              <Route path="*" component={StartView} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/search/:id" component={ResultsView} />
              <Route path="/search" component={SearchView} />
              <Route path="/authorisation" component={AuthView} />
              <Route path="*" component={SearchView} />
            </Switch>
          )}
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
