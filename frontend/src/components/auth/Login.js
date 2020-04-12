import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Authorize from '../../lib/authorize'

class Login extends React.Component {

  state = {
    loginData: {
      email: '',
      password: ''
    }
  }

  changeLogin = ({ target: { name, value } }) => {
    this.setState({ loginData: { ...this.state.loginData, [name]: value }, error: '' })
  }

  loginUser = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/users/login/', this.state.loginData)
      Authorize.setToken(res.data.token)
      this.props.history.push('/')
    } catch (err) {
      console.log('SOMETHING IS VERY WRONG!!!\n', err)
      this.setState({ error: err.response.data.message })
    }
  }

  render() {
    return (
      <>
      <section className="section auth-page" style={{ flexGrow: 1, display: 'flex', alignItems: 'center'  }}>
        <div className="container">
          <div className="columns">
            <form className="column is-half is-offset-one-quarter auth-form">
              <h2 className="title is-2 has-text-centered">Login</h2>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    type="text"
                    name="email"
                    className={`input ${this.state.error ? 'is-danger' : ''}`}
                    placeholder="Email"
                    onChange={this.changeLogin} 
                  />
                  {this.state.error && <small className="has-text-danger">{this.state.error}</small>}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                    type="password" 
                    name="password" 
                    className={`input ${this.state.error ? 'is-danger' : ''}`} 
                    placeholder="Password" 
                    onChange={this.changeLogin}
                  />
                  {this.state.error && <small className="has-text-danger">{this.state.error}</small>}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-fullwidth" onClick={this.loginUser}>Login</button>
                </div>
                <br />
                <div className="container">
                  <p className="has-text-centered has-text-white has-text-weight-bold">Don't have an account? <Link to="/register" className="has-text-link">Register</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default Login