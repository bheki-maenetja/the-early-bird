import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends React.Component {

  state = {
    registerData: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {}
  }

  changeRegister = ({ target: { name, value } }) => {
    this.setState({ registerData: { ...this.state.registerData, [name]: value }, errors: { ...this.state.errors, [name]: '' } })
  }

  registerUser = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/users/register/', this.state.registerData)
      res.status === 201 ? console.log('Registered') : console.log(res.data)
      this.props.history.push('/login')
    } catch (err) {
      console.log('SOMETHING IS VERY WRONG!!!\n', err)
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    return (
      <>
      <section className="section" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', overflowY: 'scroll'  }}>
        <div className="container">
          <div className="columns">
            <form className="column is-half is-offset-one-quarter" style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '15px' }}>
              <h2 className="title is-2 has-text-centered has-text-white">Register</h2>
              <div className="field">
                <label className="label has-text-white">First Name</label>
                <div className="control">
                  <input 
                    type="text"
                    className={`input ${this.state.errors.first_name ? 'is-danger' : ''}`}
                    name="first_name"
                    placeholder="First Name" 
                    onChange={this.changeRegister}
                    value={this.state.registerData['first_name']}
                  />
                  {this.state.errors.first_name && <small className="has-text-danger">{this.state.errors.first_name[0]}</small>}
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">Last Name</label>
                <div className="control">
                  <input
                    type="text"
                    className={`input ${this.state.errors.last_name ? 'is-danger' : ''}`}
                    name="last_name"
                    placeholder="Last Name" 
                    onChange={this.changeRegister}
                    value={this.state.registerData['last_name']}
                  />
                  {this.state.errors.last_name && <small className="has-text-danger">{this.state.errors.last_name[0]}</small>}
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">Username</label>
                <div className="control">
                  <input 
                    type="text"
                    className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                    name="username"
                    placeholder="Username" 
                    onChange={this.changeRegister}
                    value={this.state.registerData['username']}
                  />
                  {this.state.errors.username && <small className="has-text-danger">{this.state.errors.username[0]}</small>}
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">Email</label>
                <div className="control">
                  <input 
                    type="text"
                    className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    name="email"
                    placeholder="Email Address" 
                    onChange={this.changeRegister}
                    value={this.state.registerData['email']}
                  />
                  {this.state.errors.email && <small className="has-text-danger">{this.state.errors.email[0]}</small>}
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">Password</label>
                <div className="control">
                  <input 
                    type="text"
                    className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    name="password"
                    placeholder="Password" 
                    onChange={this.changeRegister}
                    value={this.state.registerData['password']}
                  />
                  {this.state.errors.password && <small className="has-text-danger">{this.state.errors.password[0]}</small>}
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">Password Confirmation</label>
                <div className="control">
                  <input 
                    type="text"
                    className={`input ${this.state.errors.password_confirmation ? 'is-danger' : ''}`}
                    name="password_confirmation"
                    placeholder="Confirm your password" 
                    onChange={this.changeRegister}
                    value={this.state.registerData['password_confirmation']}
                  />
                  {this.state.errors.password_confirmation && <small className="has-text-danger">{this.state.errors.password_confirmation[0]}</small>}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-info is-fullwidth" onClick={this.registerUser}>Register</button>
                </div>
                <br />
                <div className="container">
                  <p className="has-text-centered has-text-white has-text-weight-bold">Already have an account? <Link to="/login" className="has-text-warning">Login</Link></p>
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

export default Register