import React from 'react'

function Station({ item, handleClick}) {
  console.log('item', item)
  const getColor = (color) => {
    if(color === "R"){
      return "red";
    }
    else if(color === "G"){
      return "green";
    }
    else if(color === "O"){
      return "orange";
    }
    else if(color === "B"){
      return "blue";
    }
  }
  
  return (
    <div className="station-line-container">
      <div className="station-and-name" onClick={handleClick(item.station_id)} id={"s-" + item.station_id}> {/* you should add both id and onClick to attributes */}
        <div className={"station-rectangle " + getColor(item.station_type) + ((item.station_order === 1 || item.distance_to_next === -1) ? " end" : "")}>{item.station_id}</div>
        <div className="station-name">{item.station_name}</div>
      </div>
      {(item.distance_to_next === -1) ? <></> :
        <div className={"line " + getColor(item.station_type)} id={"l-" + item.station_id}></div> /* you should add both id to attributes */
      }
    </div>
  )
}

export default Station
