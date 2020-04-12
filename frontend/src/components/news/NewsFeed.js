import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Authorize from '../../lib/authorize'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

class NewsFeed extends React.Component {

  state = {
    userData: null,
    articles: null,
    modalActive: false,
    currentArticle: null
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ userData: res.data })
      if (res.data.favourite_publishers.length > 0) this.getArticles(res.data.favourite_publishers.map(pub => pub.slug))
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

  getArticles = async (publishers) => {
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?sources=${publishers.join()}&apiKey=${newsApiKey}`)
      this.setState({ articles: res.data.articles })
    } catch (err) {
      console.log(err)
    }
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
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  clearModal = () => {
    this.setState({ modalActive: false, currentArticle: null })
  }

  render() {
    const { articles, userData, modalActive, currentArticle } = this.state
    if (!userData) return false
    let userArts
    if (articles && userData && Authorize.isAuthenticated()) {
      userArts = userData.saved_articles.map(art => art.title)
    }
    return (
      <>
      <section className="section news-page" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <h1 className="title is-1 has-text-centered">Top Headlines from your Favourite Publishers</h1>
          {articles ? 
          <>
          <br />
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent">
              <div className="tile">
                <div className="tile is-parent is-8">
                  <div className="tile box is-child news-article">
                    <figure className="image is-3by2">
                      <img src={articles[0].urlToImage} alt={articles[0].title} />
                    </figure>
                    <hr />
                    <h1 className="title is-4" onClick={() => this.viewArticle(articles[0])}>{articles[0].title}</h1>
                    <p className="subtitle is-6" onClick={() => this.viewArticle(articles[0])}>{articles[0].description ? articles[0].description : articles[0].content}</p>
                    {Authorize.isAuthenticated() &&
                      <div className="level">
                        <div className="level-left">
                          <a href={articles[1].url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          {userArts.includes(articles[0].title) ? 
                          <>
                            <i className="fas fa-bookmark fa-2x" onClick={() => this.unsaveArticle(articles[0])}></i>
                          </>
                          :
                          <>
                            <i className="far fa-bookmark fa-2x" onClick={() => this.saveArticle(articles[0])}></i>
                          </>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="tile is-parent">
                  <div className="tile is-child box news-article" >
                    <figure className="image is-3by2">
                      <img src={articles[1].urlToImage} alt={articles[1].title} />
                    </figure>
                    <hr />
                    <h2 className="title is-5" onClick={() => this.viewArticle(articles[1])}>{articles[1].title}</h2>
                    <p className="subtitle is-6" onClick={() => this.viewArticle(articles[1])}>{articles[1].description ? articles[1].description : articles[1].content}</p>
                    {Authorize.isAuthenticated() && 
                      <div className="level">
                        <div className="level-left">
                          <a href={articles[1].url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          {userArts.includes(articles[1].title) ? 
                          <>
                            <i className="fas fa-bookmark fa-2x" onClick={() => this.unsaveArticle(articles[1])}></i>
                          </>
                          :
                          <>
                            <i className="far fa-bookmark fa-2x" onClick={() => this.saveArticle(articles[1])}></i>
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
                <div className="news-article box" style={{ height: '100%' }}>
                  <figure className="image is-3by2">
                    <img src={art.urlToImage} alt={art.title} />
                  </figure>
                  <hr />
                  <h3 className="title is-5" onClick={() => this.viewArticle(art)}>{art.title}</h3>
                  <p className="subtitle is-6" onClick={() => this.viewArticle(art)}>{art.description ? art.description : art.content}</p>
                  <div className="container">
                    {Authorize.isAuthenticated() &&
                      <div className="level">
                        <div className="level-left">
                          <a href={art.url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          {userArts.includes(art.title) ? 
                          <>
                            <i className="fas fa-bookmark fa-2x" onClick={() => this.unsaveArticle(art)}></i>
                          </>
                          :
                          <>
                            <i className="far fa-bookmark fa-2x" onClick={() => this.saveArticle(art)}></i>
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
            <div className="modal-content box modal-news-article">
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
          {userData.favourite_publishers.length === 0 ? 
          <>
          <br />
          <h2 className="subtitle is-3 has-text-centered">You don't follow any publishers</h2>
          <h3 className="subtitle is-5 has-text-centered">You can follow a variety of news sources <Link to="/publishers">here</Link></h3>
          </>
          :
          <>
          <h2 className="title is-2">Loading...</h2>
          <progress className="progress is-danger" max="100">30%</progress>
          </>
          }
          </>
          } 
        </div>
      </section>
      </>
    )
  }
}

export default NewsFeed