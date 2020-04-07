import React from 'react'
import axios from 'axios'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

class Entertainment extends React.Component {

  state = {
    articles: null,
    countryCode: 'za',
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
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=za&category=entertainment&apiKey=${newsApiKey}`)
      this.setState({ articles: res.data.articles })
    } catch (err) {
      console.log(err)
    }
  }

  getArticles = async (code) => {
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${code}&category=entertainment&apiKey=${newsApiKey}`)
      this.setState({ articles: res.data.articles })
    } catch (err) {
      console.log(err)
    }
  }

  changeCountry = (e) => {
    this.setState({ countryCode: e.target.value })
    this.getArticles(e.target.value)
  }

  render() {
    const { articles, countries, countryCode } = this.state
    if (!articles) return false
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <h1 className="title is-1 has-text-centered">Top Entertainment Headlines from around the World</h1>
          <hr />
          <div className="container has-text-centered">
            <form>
              <div className="field">
                <label className="label">Country</label>
                <select onChange={this.changeCountry}>
                  {countries.map(count => (
                    <>
                    {count.code === countryCode ? <option key={count.code} value={count.code} selected>{count.name}</option> : <option key={count.code} value={count.code}>{count.name}</option>}
                    </>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent">
              <div className="tile">
                <div className="tile is-parent is-7">
                  <div className="tile is-child box">
                    <figure className="image is-4by3">
                      <img src={articles[0].urlToImage} alt={articles[0].title} />
                    </figure>
                    <h1 className="title is-3">{articles[0].title}</h1>
                    <p>{articles[0].description}</p>
                  </div>
                </div>
                <div className="tile is-parent">
                  <div className="tile is-child box" >
                    <figure className="image is-4by3">
                      <img src={articles[1].urlToImage} alt={articles[1].title} />
                    </figure>
                    <h2 className="subtitle is-5">{articles[1].title}</h2>
                    <p>{articles[1].description}</p>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile is-multiline">
                {articles.slice(2).map(art => (
                  <>
                  <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                    <div className="tile is-child box" style={{ height: '100%' }}>
                      <h3 className="title is-5">{art.title}</h3>
                      <p>{art.description}</p>
                    </div>
                  </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default Entertainment