import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import 'bulma'
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css'

import Home from './common/Home'
import Navbar from './common/Navbar'
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

class Index extends React.Component {

  state = {}

  render() {
    return (
      <>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/newsfeed" component={NewsFeed} />
            <Route path="/news/top" component={TopNews} />
            <Route path="/news/business" component={Business} />
            <Route path="/news/entertainment" component={Entertainment} />
            <Route path="/news/sports" component={Sports} />
            <Route path="/news/sci-tech" component={STEM} />
            <Route path="/weather" component={Weather} />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
      </>
    )
  }
}

export default Index 