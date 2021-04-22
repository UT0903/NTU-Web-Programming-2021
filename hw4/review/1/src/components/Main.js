import React from 'react'
import Row from "../components/Row";


const Main = ({sheetData, handleClicks, handleCellKeyDown, handleInputKeyDown, handleInputOnchange}) => {

  return (
    <div className="main">
      {sheetData.map((r, index) => {
        return <Row Data={r} id={index} 
        handleClicks={handleClicks} 
        handleCellKeyDown={handleCellKeyDown}
        handleInputKeyDown={handleInputKeyDown}
        handleInputOnchange={handleInputOnchange}
        key={index}
        />
      })}
    </div>
  )
}

export default Main
