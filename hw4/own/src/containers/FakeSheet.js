import React, { useState, Component, useEffect, useRef } from "react";
import DataSheet from "../components/DataSheet";
import 'react-datasheet/lib/react-datasheet.css'; 


function FakeSheet(props){
    const [grid, setGrid] = useState(InitGrid(100, 26));
    function InitGrid(row, col){
        const data = [];
        for(let i = 0; i < row; i++){
            const newRow = new Array(col);
            newRow.fill({value: '', onEdit: false, onFocus: false});
            data.push(newRow);
        }
        const grid = {
            data: data, //row * col array
            curRow: row,
            curCol: col,
            numRow: row,
            numCol: col,
        }
        return grid;
    }
    const addRow = (e)=>{
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data.splice(pregrid.curRow, 0, new Array(grid.numCol).fill({value: '', onEdit: false, onFocus: false}));
            newGrid.numRow++;
            newGrid.curRow = newGrid.numRow;
            newGrid.curCol = newGrid.numCol;
            return newGrid;
        });
    }
    const delRow = (e)=>{
        if(grid.numRow > 1){
            setGrid((pregrid)=>{
                const newGrid = JSON.parse(JSON.stringify(pregrid));
                newGrid.data.splice(pregrid.curRow-1, 1);
                newGrid.numRow--;
                newGrid.curRow = newGrid.numRow;
                newGrid.curCol = newGrid.numCol;
                return newGrid;
            });
        }
    }
    const addCol = (e)=>{
        setGrid((pregrid)=>{
            const newGrid = JSON.parse(JSON.stringify(pregrid));
            newGrid.data = newGrid.data.map((x)=>{ //x: each row
                x.splice(pregrid.curCol, 0, {value: '', onEdit: false, onFocus: false});
                return x;
            });
            newGrid.numCol++;
            newGrid.curRow = newGrid.numRow;
            newGrid.curCol = newGrid.numCol;
            return newGrid;
        });
    }
    
    const delCol = (e)=>{
        if(grid.numCol > 1){
            setGrid((pregrid)=>{
                const newGrid = JSON.parse(JSON.stringify(pregrid));
                newGrid.data = newGrid.data.map((x)=>{ //x: each row
                    x.splice(pregrid.curCol-1, 1);
                    return x;
                });
                newGrid.numCol--;
                newGrid.curRow = newGrid.numRow;
                newGrid.curCol = newGrid.numCol;
                return newGrid;
            });
        }
    }
    return (
    <>
        <button onMouseDown={addRow}>Add Row</button>
        <button onMouseDown={addCol}>Add Col</button>
        <button onMouseDown={delRow}>Del Row</button>
        <button onMouseDown={delCol}>Del Col</button>
        <div className={"sheet-container"}>
            <DataSheet
                grid={grid}
                setGrid={setGrid}
            />
        </div>
    </>
    );
  }
  export default FakeSheet;

