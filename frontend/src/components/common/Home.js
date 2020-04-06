import React from 'react'

class Home extends React.Component {

  state = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum libero venenatis pellentesque varius. Aliquam erat volutpat. Donec commodo eu felis sed convallis. Suspendisse posuere justo ac nisl pretium condimentum. Nunc eleifend velit quis erat pharetra, non pretium tellus pulvinar. Morbi sit amet porttitor sem, a ornare risus. Sed blandit pellentesque pharetra. Sed at enim rhoncus, cursus sem et, consectetur sapien. Morbi sit amet enim neque. Quisque pharetra dolor non neque pretium, a aliquet diam dapibus. Maecenas metus enim, sollicitudin in ipsum pretium, sagittis rutrum turpis. Pellentesque non massa in nulla accumsan accumsan. Integer gravida massa et ullamcorper tempus. Suspendisse sollicitudin ligula metus, et bibendum urna hendrerit in. Etiam sodales leo lobortis dignissim dignissim. Aliquam at quam sit amet lacus sagittis scelerisque ornare vel ex.'
  }

  render() {
    const { text } = this.state
    return (
      <>   
      <section className="section" style={{ flexGrow: '1', overflowY: 'scroll' }}>
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-7">
              <div className="tile is-child box">
                <h1 className="title is-1">Main Story</h1>
                <p>{text}</p>
              </div>
            </div>
            <div className="tile is-vertical is-parent">
              <div className="tile is-child box">
                <h2 className="title is-4">Secondary Story</h2>
                <p>{text}</p>
              </div>
              <div className="tile is-child box">
                <h2 className="title is-4">Secondary Story</h2>
                <p>{text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default Home