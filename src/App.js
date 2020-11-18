import React, { useEffect, useState } from 'react'
import './App.css'
import firebase from './firebase'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StartView from './containers/StartView'
import ResultsView from './containers/ResultsView'
import DetailedView from './containers/DetailedView'
import AuthView from './containers/AuthView'
import { UserContext } from './UserContext'
import SearchView from './containers/SearchView'

function App() {
  const [store, setStore] = useState({
    cities: [],
    selectedCity: {},
    authorised: false,
  })

  useEffect(() => {
    const db = firebase.firestore()
    return db.collection('cities').onSnapshot((snapshot) => {
      const citiesData = []
      snapshot.forEach((doc) => citiesData.push({ ...doc.data(), id: doc.id }))
      setStore({
        ...store,
        cities: citiesData,
        selectedCity: { name: citiesData[0].name, id: citiesData[0].id },
      })
    })
  }, [])

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <UserContext.Provider value={{store, setStore}}>
        <Switch>
          <Route path="/" exact component={StartView} />
          <Route path="/search" exact component={SearchView} />
          <Route path="/search/:id" component={ResultsView} />
          <Route path="/details" component={DetailedView} />
          <Route path="/authorisation" component={AuthView} />
          <Route path="*" component={StartView} />
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App
