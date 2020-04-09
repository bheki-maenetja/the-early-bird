import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Authorize from '../../lib/authorize'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

class Sports extends React.Component {

  state = {
    userData: null,
    articles: null,
    countryCode: 'za',
    modalActive: false,
    currentArticle: null,
    countries: [
      {name: "Argentina", code: "ar"},
      {name: "Australia", code: "au"},
      {name: "Austria", code: "at"},
      {name: "Belgium", code: "be"},
      {name: "Brazil", code: "br"},
      {name: "Bulgaria", code: "bg"},
      {name: "Canada", code: "ca"},
      {name: "China", code: "cn"},
      {name: "Colombia", code: "co"},
      {name: "Cuba", code: "cu"},
      {name: "Czech Republic", code: "cz"},
      {name: "Egypt", code: "eg"},
      {name: "France", code: "fr"},
      {name: "Germany", code: "de"},
      {name: "Greece", code: "gr"},
      {name: "Hong Kong", code: "hk"},
      {name: "Hungary", code: "hu"},
      {name: "India", code: "in"},
      {name: "Indonesia", code: "id"},
      {name: "Ireland", code: "ie"},
      {name: "Israel", code: "il"},
      {name: "Italy", code: "it"},
      {name: "Japan", code: "jp"},
      {name: "Latvia", code: "lv"},
      {name: "Lithuania", code: "lt"},
      {name: "Malaysia", code: "my"},
      {name: "Mexico", code: "mx"},
      {name: "Morocco", code: "ma"},
      {name: "Netherlands", code: "nl"},
      {name: "New Zealand", code: "nz"},
      {name: "Nigeria", code: "ng"},
      {name: "Norway", code: "no"},
      {name: "Philippines", code: "ph"},
      {name: "Poland", code: "pl"},
      {name: "Portugal", code: "pt"},
      {name: "Romania", code: "ro"},
      {name: "Russia", code: "ru"},
      {name: "Saudi Arabia", code: "sa"},
      {name: "Serbia", code: "rs"},
      {name: "Singapore", code: "sg"},
      {name: "Slovakia", code: "sk"},
      {name: "Slovenia", code: "si"},
      {name: "South Africa", code: "za"},
      {name: "South Korea", code: "kr"},
      {name: "Sweden", code: "se"},
      {name: "Switzerland", code: "ch"},
      {name: "Taiwan", code: "tw"},
      {name: "Thailand", code: "th"},
      {name: "Turkey", code: "tr"},
      {name: "UAE", code: "ae"},
      {name: "Ukraine", code: "ua"},
      {name: "United Kingdom", code: "gb"},
      {name: "United States", code: "us"},
      {name: "Venuzuela", code: "ve"}
    ]
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get('/api/users/my-profile/', {
          headers: {
            Authorization: `Bearer ${Authorize.getToken()}`
          }
        }),
        axios.get(`https://newsapi.org/v2/top-headlines?country=za&category=sports&apiKey=${newsApiKey}`)
      ])
      this.setState({ articles: res[1].data.articles, userData: res[0].data })
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
      this.setState({ userData: res.data  })
    } catch (err) {
      console.log(err)
    }
  }

  getArticles = async (code) => {
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${code}&category=sports&apiKey=${newsApiKey}`)
      this.setState({ articles: res.data.articles })
    } catch (err) {
      console.log(err)
    }
  }

  changeCountry = (e) => {
    this.setState({ countryCode: e.target.value })
    this.getArticles(e.target.value)
  }

  viewArticle = (article) => {
    if (Authorize.isAuthenticated()) {
      this.setState({ modalActive: true, currentArticle: article })
    }
  }

  saveArticle = async (article) => {
    const artData = {
      publisher: article.source.name ? article.source.name : 'N/A',
      author: article.author ? article.author : 'N/A',
      title: article.title ? article.title : 'N/A',
      description: article.description ? article.description : 'N/A',
      content: article.content ? article.content : 'N/A',
      publish_date: article.publishedAt ? article.publishedAt : 'N/A',
      source_url: article.url ? article.url : 'N/A',
      image_url: article.urlToImage ? article.urlToImage : 'N/A',
    }

    try {
      const res = await axios.post('/api/users/articles/', artData, {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      console.log(res)
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  unsaveArticle = async (article) => {
    const { userData } = this.state
    const chosenArticle = userData.saved_articles.find(art => art.title === article.title)

    try {
      const res = await axios.delete('/api/users/articles/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        },
        data: {
          articleId: chosenArticle.id
        }
      })
      console.log(res)
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  clearModal = () => {
    this.setState({ modalActive: false, currentArticle: null })
  }

  render() {
    const { articles, userData, countries, countryCode, modalActive, currentArticle } = this.state
    console.log(userData)
    let userArts
    if (articles && userData && Authorize.isAuthenticated()) {
      userArts = userData.saved_articles.map(art => art.title)
    }
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <h1 className="title is-1 has-text-centered">Top Sports Headlines from around the World</h1>
          <hr />
          {articles ? 
          <>
          <div className="container has-text-centered">
            <form>
              <div className="field">
                <label className="label">Country</label>
                <select onChange={this.changeCountry} defaultValue={countryCode}>
                  {countries.map(count => (
                    <>
                    <option key={count.code} value={count.code}>{count.name}</option>
                    </>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent">
              <div className="tile">
                <div className="tile is-parent is-8">
                  <div className="tile is-child">
                    <figure className="image is-3by2">
                      <img src={articles[0].urlToImage} alt={articles[0].title} />
                    </figure>
                    <hr />
                    <h1 className="title is-4" onClick={() => this.viewArticle(articles[0])} style={{ cursor: 'pointer' }}>
                      {Authorize.isAuthenticated() ? articles[0].title : <Link to="/login" className="has-text-dark">{articles[0].title}</Link>}
                    </h1>
                    <p className="subtitle is-6">{articles[0].description}</p>
                    {Authorize.isAuthenticated() &&
                      <div className="level">
                        <div className="level-left">
                          <a href={articles[1].url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x has-text-dark"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          {userArts.includes(articles[0].title) ? 
                          <>
                            <i className="fas fa-bookmark fa-2x" style={{ cursor: 'pointer' }} onClick={() => this.unsaveArticle(articles[0])}></i>
                          </>
                          :
                          <>
                            <i className="far fa-bookmark fa-2x" style={{ cursor: 'pointer' }} onClick={() => this.saveArticle(articles[0])}></i>
                          </>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="tile is-parent">
                  <div className="tile is-child" >
                    <figure className="image is-3by2">
                      <img src={articles[1].urlToImage} alt={articles[1].title} />
                    </figure>
                    <hr />
                    <h2 className="title is-5" onClick={() => this.viewArticle(articles[1])} style={{ cursor: 'pointer' }}>
                      {Authorize.isAuthenticated() ? articles[1].title : <Link to="/login" className="has-text-dark">{articles[1].title}</Link>}
                    </h2>
                    <p className="subtitle is-6">{articles[1].description}</p>
                    {Authorize.isAuthenticated() && 
                      <div className="level">
                        <div className="level-left">
                          <a href={articles[1].url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x has-text-dark"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          {userArts.includes(articles[1].title) ? 
                          <>
                            <i className="fas fa-bookmark fa-2x" style={{ cursor: 'pointer' }} onClick={() => this.unsaveArticle(articles[1])}></i>
                          </>
                          :
                          <>
                            <i className="far fa-bookmark fa-2x" style={{ cursor: 'pointer' }} onClick={() => this.saveArticle(articles[1])}></i>
                          </>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile is-multiline">
            {articles.slice(2).map(art => (
              <>
              <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
                <div className="" style={{ height: '100%' }}>
                  <figure className="image is-3by2">
                    <img src={art.urlToImage} alt={art.title} />
                  </figure>
                  <hr />
                  <h3 className="title is-5" onClick={() => this.viewArticle(art)} style={{ cursor: 'pointer' }}>
                    {Authorize.isAuthenticated() ? art.title : <Link to="/login" className="has-text-dark">{art.title}</Link>}
                  </h3>
                  <p className="subtitle is-6">{art.description}</p>
                  <div className="container">
                    {Authorize.isAuthenticated() &&
                      <div className="level">
                        <div className="level-left">
                          <a href={art.url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x has-text-dark"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          {userArts.includes(art.title) ? 
                          <>
                            <i className="fas fa-bookmark fa-2x" style={{ cursor: 'pointer' }} onClick={() => this.unsaveArticle(art)}></i>
                          </>
                          :
                          <>
                            <i className="far fa-bookmark fa-2x" style={{ cursor: 'pointer' }} onClick={() => this.saveArticle(art)}></i>
                          </>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
              </>
            ))}
          </div>
          {modalActive &&
          <>
          <div className="modal is-active">
            <div className="modal-background" onClick={this.clearModal}></div>
            <div className="modal-content box">
              <figure className="image is-4by3">
                <img src={currentArticle.urlToImage} alt={currentArticle.title} />
              </figure>
              <hr />
              <h1 className="title is-5">{currentArticle.title}</h1>
              <p className="subtitle is-6">{currentArticle.content ? currentArticle.content : currentArticle.description}</p>
              {Authorize.isAuthenticated() &&
                <>
                <hr />
                <div className="level">
                  <div className="level-left is-fullwidth">
                    <a href={currentArticle.url} target="_blank">
                      <button className="button is-info modal-card-title is-fullwidth">View Source&ensp;<i className="fas fa-external-link-alt has-text-white"></i></button>
                    </a>
                  </div>
                  <div className="level-right">
                    {userArts.includes(currentArticle.title) ? 
                    <>
                    <button className="button is-danger modal-card-title is-fullwidth" onClick={() => this.unsaveArticle(currentArticle)}>Remove from Bookmarks&ensp;<i className="far fa-trash-alt has-text-white"></i></button>
                    </>
                    :
                    <>
                    <button className="button is-success modal-card-title is-fullwidth" onClick={() => this.saveArticle(currentArticle)}>Save Article&ensp;<i className="far fa-bookmark has-text-white"></i></button>
                    </>
                    }
                  </div>
                </div>
                </>
              }
            </div>
          </div>
          </>
          }
          </>
          :
          <>
          <h2 className="title is-2">Loading...</h2>
          <progress class="progress is-success" max="100">30%</progress>
          </>
          } 
        </div>
      </section>
      </>
    )
  }
}

export default Sports