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
  const [cities, setCities] = useState([])

  useEffect(() => {
    const db = firebase.firestore()
    return db.collection('cities').onSnapshot((snapshot) => {
      const citiesData = []
      snapshot.forEach((doc) => citiesData.push({ ...doc.data(), id: doc.id }))
      setCities(citiesData)
    })
  }, [])

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <UserContext.Provider value={cities}>
        <Switch>
          <Route exact path="/" component={StartView} />
          <Route path="/search" component={SearchView} />
          <Route path="/search=:id" component={ResultsView} />
          <Route path="/details=:name" component={DetailedView} />
          <Route path="/authorisation" component={AuthView} />
          <Route path="*" component={StartView} />
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App
