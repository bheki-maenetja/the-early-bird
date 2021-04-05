import React from 'react'
import axios from 'axios'

import Authorize from '../../lib/authorize'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

class Publishers extends React.Component {
  state = {
    userData: null,
    sources: null,
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get('/api/users/my-profile/', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        }),
        axios.post('/api/articles/get-articles/', {
            api_url: `https://newsapi.org/v2/sources?&apiKey=${newsApiKey}`
        })
      ])
      this.setState({ sources: res[1].data.sources, userData: res[0].data })
    } catch (err) {
      console.log(err)
    }
  }

  refreshPage = async () => {
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ userData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  changeCountry = (e) => {
    this.setState({ countryCode: e.target.value })
    this.getSources(e.target.value)
  }

  followPublisher = async (source) => {
    const pubData = {
      name: source.name,
      slug: source.id,
      description: source.description,
      source_url: source.url
    }

    try {
      const res = await axios.post('/api/users/publishers/', pubData, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  unfollowPublisher = async (source) => {
    const { userData } = this.state
    const chosenSource = userData.favourite_publishers.find(pub => pub.slug === source.id)
    
    try {
      const res = await axios.delete('/api/users/publishers/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        },
        data: {
          publisherId: chosenSource.id
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { sources, userData } = this.state
    let userPubs
    if (sources && userData) {
      userPubs = userData.favourite_publishers.map(pub => pub.slug)
    }
    return (
      <>
      <section className="section publisher-page" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered">Explore the World's Most Trusted News Sources</h1>
          <div className="columns is-mobile is-multiline">
            {sources && userData ? 
            <>
              {sources.map(source => (
                <>
                <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
                  <div className="box publisher-box" style={{ height: '100%' }}>
                    <h2 className="title is-3">{source.name}</h2>
                    <hr />
                    <p className="subtitle is-5">{source.description}</p>
                    <div className="level is-mobile">
                      <div className="level-left">
                        <a href={source.url} target="_blank">
                          <i className="fas fa-external-link-alt fa-2x"></i>
                        </a>
                      </div>
                      <div className="level-right">
                        {userPubs.includes(source.id) ?
                        <>
                          <button className="button is-danger" onClick={() => this.unfollowPublisher(source)}>Unfollow</button>
                        </>
                        :
                        <>
                          <button className="button is-info" onClick={() => this.followPublisher(source)}>Follow</button>
                        </> 
                        }
                      </div>
                    </div>
                  </div>
                </div>
                </>
              ))}
            </>
            :
            <>
            <h1 className="title is-4">Loading...</h1>
            <progress className="progress is-danger" max="100">30%</progress>
            </> 
            }
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default Publishers