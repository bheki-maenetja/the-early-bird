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
          <div className="navbar-brand is-size-4">
            <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/">
              <i className="fas fa-home fa-2x"></i>
            </Link>
            <a className={`navbar-burger is-size-4 ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {!Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/top">Top News</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/newsfeed">Newsfeed</Link>}
              {Authorize.isAuthenticated() &&
                <>
                <div className={`navbar-item has-dropdown is-size-4 ${dropdownOpen ? 'is-active' : ''}`}>
                  <a className="navbar-link" onClick={this.toggleDropdown}>News</a>
                  {dropdownOpen &&  
                    <div className="navbar-dropdown">
                      <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/top">Top News</Link>
                      <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/business">Business</Link>
                      <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/sci-tech">Science &amp; Tech</Link>
                      <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/sports">Sports</Link>
                      <Link className="navbar-item" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/news/entertainment">Entertainment</Link>
                    </div>
                  }
                </div>
                </>
              }
              {Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/publishers">Publishers</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/weather">Weather</Link>}
              {!Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/login">Login</Link>}
              {!Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/register">Register</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={() => this.setState({ navbarOpen: false, dropdownOpen: false })} to="/my-profile">Profile</Link>}
              {Authorize.isAuthenticated() && <Link className="navbar-item is-size-4" onClick={this.handleLogOut} to="/">Logout</Link>}
            </div>
          </div>
        </div>
      </nav>
      </>
    )
  }
}

export default withRouter(Navbar)