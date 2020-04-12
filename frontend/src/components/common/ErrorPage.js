import React from 'react'
import { Link } from 'react-router-dom'

class ErrorPage extends React.Component {

  state = {}

  render() {
    return (
      <>
      <div className="hero is-info" style={{ flexGrow: '1' }}>
        <div className="hero-body">
          <div className="container has-text-centered" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="title is-1">Oops! - Looks ike you're in the wrong place!</h1>
            <h1 className="subtitle is-3">Take me <Link className="has-text-warning has-text-weight-bold" to='/'>home</Link></h1>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default ErrorPage