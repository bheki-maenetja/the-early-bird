import React from 'react'
import axios from 'axios'

import MapGl, { Marker, Popup, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.js'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const weatherKey = process.env.REACT_APP_WEATHER_API_KEY

class Weather extends React.Component {

  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0,
      center: [0,0]
    },
    capitals: null,
    weatherData: [],
    currentCap: null,
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/all')
      const capital_names = res.data.map(count => count.capital).filter(cap => cap)
      const capitals = []
      capital_names.map(async cap => {
        try {
          const locRes = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cap}.json`, { params: { access_token: mapboxToken } })
          capitals.push({ name: cap, location: locRes.data.features[0].center  })
        } catch (err) {
          console.log(err)
        }
      })
      this.setState({ capitals })
    } catch(err) {
      console.log(err)
    }
  }

  getWeatherData = async (cap) => {
    try {
      const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cap.name}&units=metric&appid=${weatherKey}`)
      const weatherData = {
        description: res.data.weather[0].description,
        temp: res.data.main.temp,
        temp_min: res.data.main.temp_min,
        temp_max: res.data.main.temp_max,
        humidity: res.data.main.humidity,
        wind_speed: res.data.wind.speed 
      }
      this.setState({ weatherData })
    } catch (err) {
      console.log(err)
    }
  }

  goToCity = async (cap) => {
    this.setState({  
      currentCap: cap,
      viewport: {...this.state.viewport, latitude: cap.location[1], longitude: cap.location[0], zoom: 8, center: cap.location } 
    })
    this.getWeatherData(cap)
  }

  render() {
    const { capitals, currentCap, weatherData } = this.state
    if (!capitals) return false
    return (
      <>
      <section className="section" id="world-map" style={{ flexGrow: '1', padding: 0 }}>
        
        {/* <div id="" style={{ position: 'absolute', top: '0', bottom: '0' }}></div> */}
        <MapGl
          height={'100%'}
          width={'100%'}
          container={'world-map'}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
          mapboxApiAccessToken={mapboxToken}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport, currentCap: null, weatherData: [] })}
        >
          <h1 className="title is-1 has-text-white has-text-left">WorldMap</h1>
          {capitals.map((cap, i) => (
            <>
              <Marker 
                key={i}
                latitude={cap.location[1]} 
                longitude={cap.location[0]}
              >
                <span onClick={() => this.goToCity(cap)}>🔹</span>
              </Marker>
              <div style={{ position: 'absolute', right: 0 }}>
                <NavigationControl />
              </div>
            </>
          ))}
          {currentCap &&
            <Popup
              latitude={currentCap.location[1]}
              longitude={currentCap.location[0]}
              closeOnClick={true}
            >
              <h1 className="title is-5">{currentCap.name}</h1>
              <p>{weatherData.description}</p>
              <p><i className="fas fa-thermometer-half"></i> {Math.round(weatherData.temp)}°C</p>
              <p><i className="fas fa-temperature-low"></i> {Math.round(weatherData.temp_min)}°C</p>
              <p><i className="fas fa-temperature-high"></i> {Math.round(weatherData.temp_max)}°C</p>
              <p><i className="fas fa-wind"></i> {Math.round(weatherData.wind_speed * 3.6)} kph</p>
              <p><i className="fas fa-tint"></i> {weatherData.humidity}%</p>
            </Popup>
            }
        </MapGl>
      </section>
      </>
    )
  }
}

export default Weather