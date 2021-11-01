import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from '../components/Auth/SignUp.jsx'
import SignIn from '../components/Auth/SignIn.jsx'
import Home from '../components/Home/Home.jsx'
import Einingar, { AddBook, GetBooks, EditBook } from '../components/Einingar/Einingar.jsx'
import Auth from '../components/Auth/Auth.jsx'
import Dashboard from '../components/Dashboard/Dashboard.jsx' 


function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/Einingar' component={Einingar} />
        <Route path="/rl" component={GetBooks} />
        <Route path="/update-rl" component={AddBook} />
        <Route path="/auth" component={Auth} />
        <Route path="/edit/:id" component={EditBook} />
        <Route path="/l" component={Einingar} />
        <Route path="/domain" component={Einingar} />
        <Route path="/db" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default Routes
