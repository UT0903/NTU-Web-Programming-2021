import Cell from "./Cell";
function Table({grid, setGrid}){
    const genCharArray = (id) => {
        console.log(id);
        
        let temp = id;
        let str = String.fromCharCode((temp % 26) + 65);
        temp = Math.floor(temp / 26);
        while(temp > 0){
            str = String.fromCharCode((temp % 26) + 64).concat(str);
            temp = Math.floor(temp / 26);
        }
        return str;
    }
    const onBlur = (e, rowIdx, colIdx) => {
        console.log('onBlur', e, rowIdx, colIdx);
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data[rowIdx][colIdx].onEdit = false;
            newGrid.data[rowIdx][colIdx].onFocus = false;
            newGrid.curRow = newGrid.data.length;
            newGrid.curCol = newGrid.data[0].length;
            return newGrid;
        });
    }
    const onDoubleClick = (e, rowIdx, colIdx)=> {
        console.log('onDbClick', e, rowIdx, colIdx);
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data[rowIdx][colIdx].onEdit = true;
            newGrid.data[rowIdx][colIdx].onFocus = true;
            newGrid.curRow = rowIdx;
            newGrid.curCol = colIdx;
            return newGrid;
        });
    }
    const onKeyPress = (e, rowIdx, colIdx)=>{
        console.log('onKeyPress', e, rowIdx, colIdx);
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data[rowIdx][colIdx].onEdit = true;
            newGrid.data[rowIdx][colIdx].value = "";
            return newGrid;
        });
    }
    const onClick = (e, rowIdx, colIdx) =>{
        console.log('onClick', e, rowIdx, colIdx);
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data[rowIdx][colIdx].onFocus = true;
            newGrid.curRow = rowIdx;
            newGrid.curCol = colIdx;
            return newGrid;
        });
    }
    const onInputChange = (e, rowIdx, colIdx) =>{
        console.log('onInputChange', e, rowIdx, colIdx);
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data[rowIdx][colIdx].value = e.target.value;
            return newGrid;
        });
    }
    const onInputKeyPress = (e, rowIdx, colIdx) =>{
        console.log('onInputKeyPress', e, rowIdx, colIdx);
        if(rowIdx < grid.numRow - 1){
            onBlur(e, rowIdx, colIdx);
            onDoubleClick(e, rowIdx + 1, colIdx);
        }
        
    }
    return (
        <span tabIndex="0" className="data-grid-container">
            <table className="data-grid cell">
                <tbody>
                    <tr>
                        <td className="read-only cell"></td>
                        {grid.data[0].map((x, colIdx) => (
                            <td className="read-only cell" style={(colIdx === grid.curCol)? {background: "#2185d0"}:{}}>{genCharArray(colIdx)}</td>
                        ))}
                    </tr>
                    {grid.data.map((x, rowIdx)=>(
                    <tr>
                        <td className="read-only cell" style={(rowIdx === grid.curRow)? {background: "#2185d0"}:{}}>{rowIdx + 1}</td>
                        {x.map((x, colIdx)=>(
                        <Cell
                            idx={{rowIdx, colIdx}}
                            onBlur={onBlur}
                            onClick={onClick}
                            onDoubleClick={onDoubleClick}
                            onKeyPress={onKeyPress}
                            onInputChange={onInputChange}
                            onInputKeyPress={onInputKeyPress}
                            data={x}
                        />
                        ))} </tr>
                    ))}
                </tbody>
            </table>
        </span>);
}
export default Table;