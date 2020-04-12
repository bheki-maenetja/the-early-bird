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
      height: '100%',
      width: '100%',
      latitude: 0,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0,
      center: [0,0]
    },
    capitals: [],
    weatherData: [],
    currentCap: null,
  }

  async componentDidMount() {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/all')
      let capital_names = res.data.map(count => count.capital).filter(cap => cap)
      let newRes = await Promise.all(
        capital_names.map(async cap => await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cap}.json`, { params: { access_token: mapboxToken } }))
      )

      newRes = newRes.filter(obj => obj.data.features.length !== 0)
      capital_names = capital_names.filter(cap => cap !== 'Fakaofo')

      const capitals = capital_names.map((cap, i) => (
        { name: cap, location: newRes[i].data.features[0].center }
      ))

      this.setState({ capitals })
    } catch(err) {
      console.log(err)
    }
  }

  getWeatherData = async (cap) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cap.name}&units=metric&appid=${weatherKey}`)
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
    return (
      <>
      <section className="section" id="world-map" style={{ flexGrow: '1', padding: 0, width: '100%', display: 'flex' }}>
        <MapGl
          style={{ flexGrow: '1' }}
          interactive={true}
          container={'world-map'}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
          mapboxApiAccessToken={mapboxToken}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport, currentCap: null, weatherData: [] })}
        >
          <h1 className="title is-4 has-text-white has-text-left" style={{ padding: '10px', backgroundColor: 'rgba(0,0,0,0.5)' }}>Get the latest weather for major cities across the world</h1>
          <div style={{ position: 'absolute', right: 0 }}>
            <NavigationControl />
          </div>
          {capitals.map((cap, i) => (
            <>
              <Marker 
                key={i}
                latitude={cap.location[1]} 
                longitude={cap.location[0]}
              >
                <span onClick={() => this.goToCity(cap)} style={{ cursor: 'pointer' }}>🔸</span>
              </Marker>
            </>
          ))}
          {currentCap &&
            <Popup
              latitude={currentCap.location[1]}
              longitude={currentCap.location[0]}
              closeOnClick={true}
            >
              <h1 className="subtitle is-5" style={{ marginBottom: '10px' }}>{currentCap.name}</h1>
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