import React from 'react'
import Station from './station'

function RouteGraph({route_data, handleClick}) {
  console.log('data', route_data)
  return (
    <div className="route-graph-container">
      {
        route_data.map((item)=>(
          <Station item={item} handleClick={handleClick}/>
        ))
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
      }
    </div>
  )
}

export default RouteGraph
