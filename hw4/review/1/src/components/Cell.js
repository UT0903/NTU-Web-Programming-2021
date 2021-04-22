import React, { useState, useRef} from 'react'

const Cell = ({data, rowIndex, colIndex, handleClicks, handleCellKeyDown, handleInputKeyDown, handleInputOnchange}) => {
  
  const inputRef = useRef(null);

  return (
    <> 
      { data.active? <input 
        className="input-cell"
        type="text"
        value={data.value}
        onChange={handleInputOnchange}
        onKeyDown={handleInputKeyDown}
        autoFocus={true}
        rowid={rowIndex} 
        colid={colIndex}
        id={`${rowIndex},${colIndex}`}
        ref={inputRef}
      /> :
        
      (data.focus? 
      <div className={`focus-cell cell-${colIndex}`} onClick={(e) => handleClicks(e)}
        tabIndex="0" onKeyDown={handleCellKeyDown}
        rowid={rowIndex} colid={colIndex} id={`${rowIndex},${colIndex}`}
        >
          {data.value}
      </div>:  <div className={`cell cell-${colIndex}`} onClick={(e) => handleClicks(e)} 
        tabIndex="0" onKeyDown={handleCellKeyDown}
        rowid={rowIndex} colid={colIndex} id={`${rowIndex},${colIndex}`}
        >
          {data.value}
      </div>
      )
      }
      
    </>
    
    
  )
}

export default Cell
