import React from 'react'
import axios from 'axios'

import Authorize from '../../lib/authorize'

class MyProfile extends React.Component {

  state = {
    userData: null,
    modalActive: false,
    currentArticle: null,
    selectedTab: 'articles'
  }

  async componentDidMount() {
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

  refreshPage = async () => {
    const { selectedTab } = this.state
    try {
      const res = await axios.get('/api/users/my-profile/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        }
      })
      this.setState({ modalActive: false, currentArticle: null, selectedTab, userData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  changeTabs = (selectedTab) => {
    this.setState({ selectedTab })
  }

  setArticle = (article) => {
    if (Authorize.isAuthenticated()) {
      this.setState({ modalActive: true, currentArticle: article })
    }
  }

  clearModal = () => {
    this.setState({ modalActive: false, currentArticle: null })
  }

  unsaveArticle = async (article) => {
    try {
      const res = await axios.delete('/api/users/articles/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        },
        data: {
          articleId: article.id
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  unfollowPublisher = async (source) => {
    try {
      const res = await axios.delete('/api/users/publishers/', {
        headers: {
          Authorization: `Bearer ${Authorize.getToken()}`
        },
        data: {
          publisherId: source.id
        }
      })
      this.refreshPage()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { userData, selectedTab, modalActive, currentArticle } = this.state
    if (!userData) return false
    return (
      <>
      <div style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="hero is-small profile-info">
          <div className="hero-body">
            <h1 className="title is-1 has-text-centered">My Profile</h1>
            <hr />
            <div className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">First Name</p>
                  <p className="title">{userData.first_name}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Last Name</p>
                  <p className="title">{userData.last_name}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Username</p>
                  <p className="title">{userData.username}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Email</p>
                  <p className="title is-4">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="section" >
          <div className="container">
            <div className="tabs is-medium is-centered is-fullwidth">
              <ul>
                <li className={selectedTab === 'articles' ? 'is-active' : ''} onClick={() => this.changeTabs('articles')}><a style={selectedTab === 'articles' ? { color: '#e3120b', borderBottom: '1px solid #e3120b' } : {}}>Saved Articles</a></li>
                <li className={selectedTab === 'publishers' ? 'is-active' : ''} onClick={() => this.changeTabs('publishers')}><a style={selectedTab === 'publishers' ? { color: '#e3120b', borderBottom: '1px solid #e3120b' } : {}}>Favourite Publishers</a></li>
              </ul>
            </div>
            {selectedTab === 'articles' &&
              <>
              <div className="columns is-mobile is-multiline">
                {userData.saved_articles.length === 0 ?
                <>
                <div className="column is-12">
                  <div className="container">
                    <h1 className="subtitle is-2 has-text-centered">No Articles</h1>
                  </div>
                </div>
                </>
                :
                <>
                {userData.saved_articles.map(art => (
                  <>
                  <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
                    <div className="box news-article" style={{ height: '100%' }}>
                      <figure className="image is-3by2">
                        <img src={art.image_url} alt={art.title} />
                      </figure>
                      <hr />
                      <h3 className="title is-5" onClick={() => this.setArticle(art)} style={{ cursor: 'pointer' }}>
                        {art.title}
                      </h3>
                      <p className="subtitle is-6">{art.description}</p>
                      <div className="container">
                        <div className="level">
                          <div className="level-left">
                            <a href={art.source_url} target="_blank">
                              <i className="fas fa-external-link-alt fa-2x"></i>
                            </a>
                          </div>
                          <div className="level-right">
                            <i className="fas fa-bookmark fa-2x" onClick={() => this.unsaveArticle(art)} style={{ cursor: 'pointer' }}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                ))}
                </>
                }
              </div>
              </> 
            }
            {selectedTab === 'publishers' &&
              <>
              <div className="columns is-mobile is-multiline">
                {userData.favourite_publishers.length === 0 ?
                <>
                <div className="column is-12">
                  <div className="container">
                    <h1 className="subtitle is-2 has-text-centered">No Publishers</h1>
                  </div>
                </div>
                </> 
                :
                <>
                {userData.favourite_publishers.map(source => (
                  <>
                  <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
                    <div className="box publisher-box" style={{ height: '100%' }}>
                      <h2 className="title is-3">{source.name}</h2>
                      <hr />
                      <p className="subtitle is-5">{source.description}</p>
                      <div className="level is-mobile">
                        <div className="level-left">
                          <a href={source.source_url} target="_blank">
                            <i className="fas fa-external-link-alt fa-2x"></i>
                          </a>
                        </div>
                        <div className="level-right">
                          <button className="button is-danger" onClick={() => this.unfollowPublisher(source)}>Unfollow</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                ))}
                </>
                }
              </div>
              </>
            }
            {modalActive &&
            <>
            <div className="modal is-active">
              <div className="modal-background" onClick={this.clearModal}></div>
              <div className="modal-content box">
                <figure className="image is-4by3">
                  <img src={currentArticle.image_url} alt={currentArticle.title} />
                </figure>
                <hr />
                <h1 className="title is-5">{currentArticle.title}</h1>
                <p className="subtitle is-6">{currentArticle.content ? currentArticle.content : currentArticle.description}</p>
                {Authorize.isAuthenticated() &&
                  <>
                  <hr />
                  <div className="level">
                    <div className="level-left is-fullwidth">
                      <a href={currentArticle.source_url} target="_blank">
                        <button className="button is-info modal-card-title is-fullwidth">View Source&ensp;<i className="fas fa-external-link-alt has-text-white"></i></button>
                      </a>
                    </div>
                    <div className="level-right">
                      <button className="button is-danger modal-card-title is-fullwidth" onClick={() => this.unsaveArticle(currentArticle)}>Remove Article&ensp;<i className="far fa-trash-alt has-text-white"></i></button>
                    </div>
                  </div>
                  </>
                }
              </div>
            </div>
            </>
            }
          </div>
        </section>
      </div>
      </>
    )
  }
}

export default MyProfile