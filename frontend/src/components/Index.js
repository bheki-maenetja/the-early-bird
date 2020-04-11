import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import '../stylesheets/main.scss'
import 'bulma'
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css'

import SecureRoute from './common/SecureRoute'

import Home from './common/Home'
import Navbar from './common/Navbar'
import Header from './common/Header'
import ErrorPage from './common/ErrorPage'

import MyProfile from './users/MyProfile'
import Register from './auth/Register'
import Login from './auth/Login'

import NewsFeed from './news/NewsFeed'
import TopNews from './news/TopNews'
import Business from './news/Business'
import Entertainment from './news/Entertainment'
import Sports from './news/Sports'
import STEM from './news/STEM'

import Weather from './weather/Weather'
import Publishers from './publishers/Publishers'

class Index extends React.Component {

  state = {}

  render() {
    return (
      <>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <SecureRoute path="/my-profile" component={MyProfile} />
            <SecureRoute path="/newsfeed" component={NewsFeed} />
            <Route path="/news/top" component={TopNews} />
            <SecureRoute path="/news/business" component={Business} />
            <SecureRoute path="/news/entertainment" component={Entertainment} />
            <SecureRoute path="/news/sports" component={Sports} />
            <SecureRoute path="/news/sci-tech" component={STEM} />
            <SecureRoute path="/weather" component={Weather} />
            <SecureRoute path="/publishers" component={Publishers} />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
      </>
    )
  }
}

export default Index 