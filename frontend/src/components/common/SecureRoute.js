import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Authorize from '../../lib/authorize'

const SecureRoute = ({ component: Component, ...rest }) => {
  if (Authorize.isAuthenticated()) return <Route {...rest} component={Component} />
  Authorize.logout()
  return <Redirect to="/login" />
}

export default SecureRoute