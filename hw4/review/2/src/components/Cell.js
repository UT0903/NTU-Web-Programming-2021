import React, { useState, useCallback, memo, useMemo,  } from "react";
import { InputCell, Header } from "./Styles";

const Cell = ({
  rowIndex,
  columnIndex,
  columnName,
  setCellValue,
  currentValue, 
  selectedCell,
  ChangeIndexColor,
  caretCell,
  DisplayCaret,
}) => {
  const [edit, setEdit] = useState(false);
  /*useEffect(() => {
    console.log("FOCUS");
    focusRef.current.focus();
  }, [enterCell])*/
  const value = useMemo(() => {
    if (edit) {
      return currentValue || "";
    }
   }, [edit, currentValue, rowIndex, columnName]);

  const handleChange = useCallback(
    e => {
      setCellValue({
        row: rowIndex,
        column: columnName,
        value: e.target.value
      });
    },
    [rowIndex, columnName, setCellValue]
  );

  const handleKeyPress = e => {
    if (e.charCode === 13 && rowIndex+1 <= 100) {
      ChangeIndexColor(rowIndex+1, columnIndex);
      //console.log("selectedCell",selectedCell[0],selectedCell[1]);
      //console.log("enterCell",enterCell[0],enterCell[1]);
      //Focus();
    }
    return;
  }

  if (columnIndex === 0 && rowIndex === 0) {
    return <Header />;
  }

  if (columnIndex === 0 && rowIndex === selectedCell[0]) {
    return <Header focused>{rowIndex}</Header>;
  }

  if (rowIndex === 0 && columnIndex === selectedCell[1]) {
    return <Header focused>{columnName}</Header>;
  }
  
  if (columnIndex === 0) {
    return <Header>{rowIndex}</Header>;
  }

  if (rowIndex === 0) {
    return <Header>{columnName}</Header>;
  }
  
  if (columnIndex === caretCell[1] && rowIndex === caretCell[0]) {
    return(
      <InputCell
        DblClick
        contentEditable={true}
        onBlur={() => {
          setEdit(false);
        }}
        onClick={() => {
          setEdit(true);
          ChangeIndexColor(rowIndex,columnIndex);
        }}
        onDoubleClick={() => {
          setEdit(true);
          ChangeIndexColor(rowIndex,columnIndex);
          DisplayCaret(rowIndex,columnIndex);
        }}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
    />);
  }
  
  /*if (columnIndex === enterCell[1] && rowIndex === enterCell[0]) {
    return(
      <InputCell
        ref={focusRef}
        contentEditable={true}
        onBlur={() => {
          setEdit(false);
        }}
        onClick={() => {
          setEdit(false);
          ChangeIndexColor(rowIndex,columnIndex);
        }}
        onDoubleClick={() => {
          setEdit(true);
          ChangeIndexColor(rowIndex,columnIndex);
          DisplayCaret(rowIndex,columnIndex);
        }}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />);
  }*/
  
  return(
    <InputCell
      contentEditable={true}
      onBlur={() => {
        setEdit(false);
      }}
      onClick={() => {
        setEdit(false);
        ChangeIndexColor(rowIndex,columnIndex);
      }}
      onDoubleClick={() => {
        setEdit(true);
        ChangeIndexColor(rowIndex,columnIndex);
        DisplayCaret(rowIndex,columnIndex);
      }}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
  />);
};

export default memo(Cell);
