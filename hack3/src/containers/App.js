import React, { useState, useEffect } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

function App() {
  // sample structure of data
  // data: {
  //   R: [],
  //   G: []
  // }

  const [data, setData] = useState({}) // all MRT station data
  const [current_station_id, setCurrentStationId] = useState('None') // station clicked by cursor
  const [start_station, setStartStation] = useState('') // station selected as the starting one
  const [end_station, setEndStation] = useState('') // station selected as the ending one
  const [distance, setDistance] = useState(-2) // distance shown on the screen

  const station_type = current_station_id[0] // R10, station_type = R
  const station_order = current_station_id.slice(1, current_station_id.length) // R10, station_order = 10
  const station_info = current_station_id[0] !== 'N' ? data[station_type][parseInt(station_order) - 1] : null // get certain station information

  const getStations = async () => {
    // fetch data from database via backend
    // coding here ...
    const ret = await instance.get('/getStations', {})
    console.log('tmpData', ret.data.data)
    if (ret.data.message !== "success") {
      return;
    }
    const retData = ret.data.data
    //console.log('retData', retData)
    //console.log(typeof(retData))
    setData(retData)

  }
  const handleClick = (station_id) => () => {
    console.log(station_id)
    setCurrentStationId(station_id)
  }
  const calculateDistance = async () => {
    // send start and end stations to backend and get distance
    // coding here ...
  }
  const keys = Object.keys(data)
  // fetch data here after 1st render
  // coding here ...
  useEffect(() => {
    getStations()
  }, [])
  if (!Object.keys(data).length) {
    return (
      <div className="wrapper">

        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
      <div className="calculator-container">
        <div className="mode-selector">

          <span id="start-station-span">起始站</span>
          <select id="start-select" className="start-station"> {/* you should add both onChange and value to attributes */}
            <optgroup label={keys[0]}>
              {data[keys[0]].map((item) => (
                <option id={"start-group-" + item.station_id}>{item.station_name}</option>
              ))}
            </optgroup>
            <optgroup label={keys[1]}>
              {data[keys[1]].map((item) => (
                <option id={"start-group-" + item.station_id}>{item.station_name}</option>
              ))}
            </optgroup>
          </select>

          <span id="end-station-span">終點站</span>
          <select id="end-select" className="end-station"> {/* you should add both onChange and value to attributes */}
            <optgroup label={keys[0]}>
              {data[keys[0]].map((item) => (
                <option id={"end-group-" + item.station_id}>{item.station_name}</option>
              ))}
            </optgroup>
            <optgroup label={keys[1]}>
              {data[keys[1]].map((item) => (
                <option id={"end-group-" + item.station_id}>{item.station_name}</option>
              ))}
            </optgroup>
          </select>

          <button onClick={calculateDistance} id="search-btn">查詢距離</button>
          <span id="answer"> {/* you should add className to attributes */}
            {distance}
          </span>
          <span id="answer-postfix">KM</span>
        </div>

        <div className="route-graph-info-container">
          <RouteGraph route_data={data[keys[0]]} handleClick={handleClick} /> {/* you should pass data to child component with your own customized parameters */}
          <RouteGraph route_data={data[keys[1]]} handleClick={handleClick} /> {/* you should pass data to child component with your own customized parameters */}
          <StationInfo station_info={station_info} /> {/* you should pass data to child component with your own customized parameters */}
        </div>

      </div>
    </div>
  )
}

export default App
