import React, { useRef,useState, useCallback, Fragment } from "react";
import Cell from "./Cell";
import { Sheet as StyledSheet } from "./Styles";

const getColumnName = index =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

const Sheet = ({ numberOfRows, numberOfColumns }) => {
    const [data, setData] = useState({});
    const [selected, setSelected] = useState([0,0]);
    const [caret, setCaret] = useState([0,0]);
    //const focRef = useRef();
    //const enterCell=[-1,-1];
    /*const Focus = () =>{
      console.log("FOCUS");
      focRef.current.focus();
    }*/
    const setCellValue = useCallback(
    ({ row, column, value }) => {
        const newData = { ...data };

        newData[`${column}${row}`] = value;
        setData(newData);
    },
    [data, setData]
    );
    const ChangeIndexColor = (rowI, colI) => {
      setSelected([rowI,colI])
    }
    const DisplayCaret = (rowI, colI) => {
      setCaret([rowI,colI])
    }
    return (
      <StyledSheet numberOfColumns={numberOfColumns}>
        {Array(numberOfRows)
          .fill()
          .map((m, i) => {
            return (
              <Fragment key={i}>
                {Array(numberOfColumns)
                  .fill()
                  .map((n, j) => {
                    const columnName = getColumnName(j);
                    return (
                      <Cell
                        rowIndex={i}
                        columnIndex={j}
                        columnName={columnName}
                        setCellValue={setCellValue}
                        currentValue={data[`${columnName}${i}`]}
                        key={`${columnName}${i}`}
                        selectedCell={selected}
                        ChangeIndexColor={ChangeIndexColor}
                        caretCell={caret}
                        DisplayCaret={DisplayCaret}
                      />
                    );
                  })}
              </Fragment>
            );
          })}
      </StyledSheet>
    );
};

export default Sheet;