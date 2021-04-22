import React from 'react';
import Cell from "../components/Cell";

const Row = ({Data, id, handleClicks, handleCellKeyDown, handleInputKeyDown, handleInputOnchange}) => {

  return (
    
    <div className={`row row-${id}`}>
      {Data.map((item, itemIndex) => {
        return <Cell data={item} rowIndex={id} 
        colIndex={itemIndex} handleClicks={handleClicks} 
        handleCellKeyDown={handleCellKeyDown}
        handleInputKeyDown={handleInputKeyDown}
        handleInputOnchange={handleInputOnchange}
        key={id,itemIndex}
        />
      })}
    </div>
  )
}

export default Row
