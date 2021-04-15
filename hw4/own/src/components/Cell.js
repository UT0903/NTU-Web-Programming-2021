import React from "react";
export default ({idx, onBlur, onClick, onDoubleClick, onKeyPress, onInputChange, onInputKeyPress, data}) => {
    const blur = (e) => {
        onBlur(e, idx.rowIdx, idx.colIdx);
    }
    const doubleClick = (e) =>{
        onDoubleClick(e, idx.rowIdx, idx.colIdx);
    }
    const keyPress = (e) =>{
        onKeyPress(e, idx.rowIdx, idx.colIdx);
    }
    const click = (e) => {
        onClick(e, idx.rowIdx, idx.colIdx);
    }
    const inputchange = (e) =>{
        onInputChange(e, idx.rowIdx, idx.colIdx);
    }
    const inputKeyPress = (e) =>{
        if(e.key === 'Enter'){
            onInputKeyPress(e, idx.rowIdx, idx.colIdx);
        }
    }
    const renderCell = ()=>{
        if(data.onEdit){
            return (<td className="cell"
                tabIndex={idx.rowIdx+":"+idx.colIdx}
                id={idx.rowIdx+":"+idx.colIdx}>
                <input type="text"
                className="data-editor" value={data.value}
                onChange={inputchange}
                onBlur={blur}
                onKeyPress={inputKeyPress}
                autoFocus
                />
                </td>);
        }
        else{
            return (<td className="cell"
                tabIndex={idx.rowIdx+":"+idx.colIdx}
                id={idx.rowIdx+":"+idx.colIdx}
                onBlur={blur}
                onClick={click}
                onDoubleClick={doubleClick}
                onKeyPress={keyPress}>
                {data.value}
                </td>);
        }
    }
    return renderCell();
};
