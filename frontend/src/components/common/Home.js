import React from 'react'
import { Link } from 'react-router-dom'

import Authorize from '../../lib/authorize'

class Home extends React.Component {

  state = {}

  render() {
    return (
      <>   
      <div className="hero is-info home-page" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="hero-body columns is-vcentered">
          <div className="container has-text-centered" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className="title is-2 has-text-centered">Welcome to the World's Most Trusted News Source</h1>
            <h2 className="subtitle is-4 has-text-centered">Get the Latest News in Business, Science, Sports &amp; Entertainment</h2>
            <div className="buttons is-centered">
              <Link to="/news/top">
                <button className="button is-info is-large">Get Started</button>
              </Link>
              {!Authorize.isAuthenticated() && 
              <>
                <Link to="/login">
                  <button className="button is-primary is-large">Login</button>
                </Link>
                <Link to="/register">
                  <button className="button is-success is-large">Register</button>
                </Link>
              </>
              }
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Home