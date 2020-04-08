import React from 'react'
import axios from 'axios'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

class Publishers extends React.Component {
  state = {
    sources: null,
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`https://newsapi.org/v2/sources?&apiKey=${newsApiKey}`)
      console.log(res.data)
      this.setState({ sources: res.data.sources })
    } catch (err) {
      console.log(err)
    }
  }

  changeCountry = (e) => {
    this.setState({ countryCode: e.target.value })
    this.getSources(e.target.value)
  }

  render() {
    const { sources } = this.state
    if (!sources) return false
    console.log(this.state)
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <h1 className="title is-2 has-text-centered">Explore the World's Most Trusted News Sources</h1>
          <hr />
          <div className="columns is-mobile is-multiline">
            {sources.map(source => (
              <>
              <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
                <div className="box" style={{ height: '100%' }}>
                  <h2 className="title is-3">{source.name}</h2>
                  <hr />
                  <p className="subtitle is-5">{source.description}</p>
                  <div className="level is-mobile">
                    <div className="level-left">
                      <a href={source.url} target="_blank">
                        <i className="fas fa-external-link-alt fa-2x has-text-dark"></i>
                      </a>
                    </div>
                    <div className="level-right">
                      <button className="button is-info">Follow</button>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ))}
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default Publishers