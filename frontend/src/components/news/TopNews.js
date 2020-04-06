import React from 'react'
import axios from 'axios'

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

class TopNews extends React.Component {

  state = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum libero venenatis pellentesque varius. Aliquam erat volutpat. Donec commodo eu felis sed convallis. Suspendisse posuere justo ac nisl pretium condimentum. Nunc eleifend velit quis erat pharetra, non pretium tellus pulvinar. Morbi sit amet porttitor sem, a ornare risus. Sed blandit pellentesque pharetra. Sed at enim rhoncus, cursus sem et, consectetur sapien. Morbi sit amet enim neque. Quisque pharetra dolor non neque pretium, a aliquet diam dapibus. Maecenas metus enim, sollicitudin in ipsum pretium, sagittis rutrum turpis. Pellentesque non massa in nulla accumsan accumsan. Integer gravida massa et ullamcorper tempus. Suspendisse sollicitudin ligula metus, et bibendum urna hendrerit in. Etiam sodales leo lobortis dignissim dignissim. Aliquam at quam sit amet lacus sagittis scelerisque ornare vel ex.',
    articles: []
  }

  async componentDidMount() {
    // try {
    //   const res = await Promise.all([
    //     axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`),
    //     axios.get(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=${newsApiKey}`),
    //     axios.get(`https://newsapi.org/v2/top-headlines?country=za&apiKey=${newsApiKey}`)
    //   ])
    //   console.log(res)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  render() {
    const { text } = this.state
    return (
      <>
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <h1 className="title is-1 has-text-centered">Top Headlines from around the World</h1>
          <hr />
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-parent">
              <div className="tile">
                <div className="tile is-parent is-7">
                  <div className="tile is-child box">
                    <h1 className="title is-1">Main Story</h1>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="tile is-parent">
                  <div className="tile is-child box" >
                    <h2 className="title is-4">Secondary Story</h2>
                    <p>{text}</p>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile is-multiline">
                <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                  <div className="tile is-child box">
                    <h3 className="title is-5">Tertiary Story</h3>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                  <div className="tile is-child box">
                    <h3 className="title is-5">Tertiary Story</h3>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                  <div className="tile is-child box">
                    <h3 className="title is-5">Tertiary Story</h3>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                  <div className="tile is-child box">
                    <h3 className="title is-5">Tertiary Story</h3>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                  <div className="tile is-child box">
                    <h3 className="title is-5">Tertiary Story</h3>
                    <p>{text}</p>
                  </div>
                </div>
                <div className="column is-one-third-desktop is-one-quarter-tablet is-fullwidth-mobile">
                  <div className="tile is-child box">
                    <h3 className="title is-5">Tertiary Story</h3>
                    <p>{text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default TopNews