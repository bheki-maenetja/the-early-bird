import React from 'react'
import axios from 'axios'

class Index extends React.Component {

  state = {}

  async componentDidMount() {
    try {
      const res = await axios.post('/api/users/login/', {
        email: 'user1@email.com',
        password: 'pas'
      })
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  render() {
    return (
      <>
      <h1>The index page</h1>
      </>
    )
  }
}

export default Index 