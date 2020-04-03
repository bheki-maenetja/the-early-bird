import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Authorize from '../../lib/authorize'

class Navbar extends React.Component {

  state = {
    navbarOpen: false,
    dropdownOpen: false
  }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  handleLogOut = () => {
    Authorize.logout()
    this.setState({ navbarOpen: false })
  }

  render() {
    const { navbarOpen, dropdownOpen } = this.state
    return (
      <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/">
              <i className="fas fa-home fa-2x"></i>
            </Link>
            <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {!Authorize.isAuthenticated() && <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/news/top">Top News</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/newsfeed">Newsfeed</Link>}
              {Authorize.isAuthenticated() &&
                <>
                <div className={`navbar-item has-dropdown ${dropdownOpen ? 'is-active' : ''}`}>
                  <a className="navbar-link" onMouseOver={this.toggleDropdown}>News</a>
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/business">Business</Link>
                    <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/sci-tech">Science &amp; Tech</Link>
                    <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/sports">Sports</Link>
                    <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/entertainment">Entertainment</Link>
                  </div>
                </div>
                </>
              }
              {Authorize.isAuthenticated() && <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/weather">Weather</Link>}
              {!Authorize.isAuthenticated() && <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/login">Login</Link>}
              {!Authorize.isAuthenticated() && <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/register">Register</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false })} to="/my-profile">Profile</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item" onClick={this.handleLogOut} to="/">Logout</Link>}
            </div>
          </div>
        </div>
      </nav>
      </>
    )
  }
}

export default withRouter(Navbar)