import React, { useState , useMemo, useEffect} from 'react';
import Main from "../components/Main";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { boolean } from 'mathjs';


const FakeSheet = () => {
    
    // initialize Data with 100 rows and 26 columns
    // const data = useMemo(() => Array.from((101).fill({focus: false, value: " "}).map(() => new Array(27).fill({focus: false,value: " "})))
    const data = useMemo(() => Array.from(Array(101), () => {return new Array(27).fill({focus: false, active: false, value: " ", 
    displayMathEquation: false, mathMode: false})}));
    
    // XAxis label
    for(let i = 1; i < 27; i++) {
        data[0][i] = { ...data[0][i], value: String.fromCharCode(64 + i)};
    }

    // YAxis label
    for(let i = 1; i < 101; i++) {
        data[i][0] = {...data[i][0], value: i};
    }
    data[0][0] = {...data[0][0], value: "   "};

    const [sheetData, setSheetData] = useState(data);
    const [timeOutLength, setTimeOutLength] = useState(null);
    const [focusCell, setFocusCell] = useState([null, null]);
    const [activeCell, setActiveCell] = useState([null, null]);
    const [mathCell, setMathCell] = useState([null, null]);

    useEffect(() => {
            let [focusX, focusY] = focusCell;
            let [activeX, activeY] = activeCell;
            let [mathX, mathY] = mathCell;

            let newSheet = [...sheetData];

            if (mathX !== null && mathY !== null) {
                for(let i = 1; i < sheetData.length; i++) {
                    for( let j = 1; j < sheetData[i].length; j++) {
                        newSheet[i][j] = {...newSheet[i][j], mathMode:true};
                    }
                }
            }
            else {
                for(let i = 1; i < sheetData.length; i++) {
                    for( let j = 1; j < sheetData[i].length; j++) {
                        newSheet[i][j] = {...newSheet[i][j], mathMode:false};
                    }
                }
            }
            

            for(let i = 0; i < sheetData.length; i++) {
                for( let j = 0; j < sheetData[i].length; j++) {
                    if (i !== focusX || j !== focusY || i !== activeX || j !== activeY) {
                        newSheet[i][j] = {...newSheet[i][j], focus:false, active:false};
                    }
                }
            }

            if(focusX === null && focusY === null) {
                ; // [null, null] means click outside current focus cell -> cancel current focus cell's focus state
            }
            else {
                newSheet[focusX][focusY] = {...newSheet[focusX][focusY], focus:true};
                document.getElementById(`${focusX},${focusY}`).focus();
                if(focusX === 0 || focusY === 0) {
                    newSheet[0][0] = {...newSheet[0][0], focus:true};
                } 
                else {
                    newSheet[0][focusY] = {...newSheet[0][focusY], focus:true};
                    newSheet[focusX][0] = {...newSheet[focusX][0], focus:true};
                }
                
            }    
            if(activeX === null && activeY === null) {
                ; // [null, null] means click outside current active cell -> cancel current active cell's active state
            }
            else {
                newSheet[activeX][activeY] = {...newSheet[activeX][activeY], active:true};
                if(activeX === 0 || activeY === 0) {
                    newSheet[0][0] = {...newSheet[0][0], focus:true};
                }
                else {
                    if(mathX === null && mathY === null){
                        newSheet[0][activeY] = {...newSheet[0][activeY], focus:true};
                        newSheet[activeX][0] = {...newSheet[activeX][0], focus:true};
                    }
                }
                
            }

            // newSheet[0][0] = {...newSheet[0][0], focus:false, active:false};

            setSheetData(newSheet);
        } , [focusCell, activeCell, mathCell]);
    

    // select cell 
    const handleClicks = (e) => {
        e.preventDefault();
        let newSheet = [...sheetData];
        let R = parseInt(e.target.getAttribute('rowid'));
        let C = parseInt(e.target.getAttribute('colid'));
        let [mathX, mathY] = mathCell;
        let [activeX, activeY] = activeCell;

        if (timeOutLength !== null) {

            // Double Click 
            if(mathX !== null && mathY !== null) {
                // disable double click when there is any cell in math mode.
                // in math mode only single click is allowed
                return;
            }

            if (newSheet[R][C].displayMathEquation === true) {

                let mathEquation = newSheet[R][C].mathEquation;
                newSheet[R][C] = {...newSheet[R][C], value: mathEquation};
                setMathCell([R, C]);
            } else {
                setMathCell([null, null]);
            }
            
            setFocusCell([null, null]);
            if( R === 0 || C === 0) {
                ;
            } else {
                setActiveCell([R,C]);
            }
            
            setSheetData(newSheet);
            clearTimeout(timeOutLength);
            setTimeOutLength(null);

        } else {
            setTimeOutLength(setTimeout(()=>{
            // Single Click
            if(sheetData[R][C].mathMode === true) {
                let oldData = newSheet[activeX][activeY].value;
                let romanIndex = indexToRoman(R,C);
                newSheet[activeX][activeY] = {...newSheet[activeX][activeY], value: oldData + romanIndex};
                setFocusCell([R,C]);
            }
            else {
                setFocusCell([R,C]);
                setActiveCell([null, null]);
            }
            
            
            setSheetData(newSheet);
            clearTimeout(timeOutLength);
            setTimeOutLength(null);
            }, 300))
        }

        setSheetData(newSheet);
        
    }

    const indexToRoman = (X, Y) => {
        let strX = X.toString();
        let newChar1 = String.fromCharCode(65 + (Y-1) % 26);
        if (parseInt((Y - 1) / 26) === 0) {
            return newChar1 + strX;
        }
        else {
            let newChar2 = String.fromCharCode(64 + parseInt((Y - 1) / 26));
            return newChar2 + newChar1 + strX ;
        }
    }

    const handleCellKeyDown = (e) => {
        e.preventDefault();
        let key = e.key;
        let content = e.target.value;
        let rowID = parseInt(e.target.getAttribute('rowid'));
        let colID = parseInt(e.target.getAttribute('colid'));
        let isFocus = sheetData[rowID][colID].focus;
        let forbidkey = ["Escape", 'Meta', 'Alt','Control','CapsLock', 'Shift'];
        let [activeX, activeY] = activeCell;
        let [mathX, mathY] = mathCell;
        let mathMode = false;
        if(mathX === null && mathY === null) {
            mathMode = false;
        } else {
            mathMode = true;
        }

        if(forbidkey.includes(key)) {
            return ;
        }
        else if ((rowID === 0 || colID === 0) && ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(key) === false) {
            return;
        }
        else {
            console.log(e.target);
            let newSheet = [...sheetData];
            let oldContent = sheetData[rowID][colID].value;
            if (isFocus) {
                if (["Escape", 'Meta', 'Alt','Control'].includes(key)) return;
                switch (key) {
                    case "Backspace":
                        newSheet[rowID][colID] = {...newSheet[rowID][colID], value: " ", focusHasData:false};
                        break;
                    case "Tab": 
                        if(colID+1 >= sheetData[0].length) return;
                        setFocusCell([rowID, colID+1]);
                        document.getElementById(`${rowID},${colID}`).blur();
                        document.getElementById(`${rowID},${colID+1}`).focus();
                        document.getElementById(`${rowID},${colID+1}`).scrollIntoView({block: "center"});
                        break;
                    case "Enter":
                        if(mathMode) {
                            if(activeX+1 >= sheetData.length){
                                setFocusCell([null,null]);
                                setActiveCell([null,null]);
                                document.getElementById(`${rowID},${colID}`).blur();
                            } else {
                                setFocusCell([activeX+1,activeY]);
                                setActiveCell([null,null]);
                            }
                            let computedVal = evaluateCellValue(activeX,activeY);
                            let mathEquation = newSheet[rowID][colID].value;
                            newSheet[activeX][activeY] = {...newSheet[activeX][activeY], value: computedVal,
                            mathEquation: mathEquation};
                            setMathCell([null,null]);
                        }
                        else {
                            if (newSheet[rowID][colID].displayMathEquation === true){

                                let mathEquation = newSheet[rowID][colID].mathEquation;
                                console.log(mathEquation);
                                newSheet[rowID][colID] = {...newSheet[rowID][colID], value: mathEquation};
                                setMathCell([rowID, colID]);
                            }
                            setActiveCell([rowID,colID]);
                            setFocusCell([null,null]);
                        }
                        
                        
                        break;
                    case "ArrowDown":
                        if(rowID + 1 >= sheetData.length) return;
                        setFocusCell([rowID+1, colID]);
                        document.getElementById(`${rowID},${colID}`).blur();
                        document.getElementById(`${rowID+1},${colID}`).focus();
                        document.getElementById(`${rowID+1},${colID}`).scrollIntoView({block: "center"});
                        break;
                    case "ArrowUp":
                        if(rowID-1 < 0) return;
                        setFocusCell([rowID-1, colID]);
                        document.getElementById(`${rowID},${colID}`).blur();
                        document.getElementById(`${rowID-1},${colID}`).focus();
                        document.getElementById(`${rowID-1},${colID}`).scrollIntoView({block: "center"});
                        break;
                    case "ArrowRight":
                        if(colID+1 >= sheetData[0].length) return;
                        setFocusCell([rowID, colID+1]);
                        document.getElementById(`${rowID},${colID}`).blur();
                        document.getElementById(`${rowID},${colID+1}`).focus();
                        document.getElementById(`${rowID},${colID+1}`).scrollIntoView({block: "center"});
                        break;
                    case "ArrowLeft":
                        if(colID-1 < 0) return;
                        setFocusCell([rowID, colID-1]);
                        document.getElementById(`${rowID},${colID}`).blur();
                        document.getElementById(`${rowID},${colID-1}`).focus();
                        document.getElementById(`${rowID},${colID-1}`).scrollIntoView({block: "center"});
                        break;
                    
                    default:
                        // if(mathMode) return;
                        if(oldContent.length > 0) {

                            newSheet[rowID][colID] = {...newSheet[rowID][colID], value: " "};
                            newSheet[rowID][colID] = {...newSheet[rowID][colID], value: key};
                        }
                        if(key === "=") {
                            newSheet[rowID][colID] = {...newSheet[rowID][colID], displayMathEquation: true};
                            setMathCell([rowID,colID]);
                        }
                        setActiveCell([rowID,colID]);
                        break;
                }
            }
            setSheetData(newSheet);
        }      
    }

    

    const handleInputKeyDown = (e) => {

        let newSheet = [...sheetData];
        let rowID = parseInt(e.target.getAttribute('rowid'));
        let colID = parseInt(e.target.getAttribute('colid'));
        let content = e.target.value;
        let [mathX, mathY] = mathCell;
        let mathMode = false;
        if (mathX === null && mathY === null) {
            mathMode = false;
        } else {
            mathMode = true;
        }

        let key = e.key;    
        let forbidkey = ['Meta', 'Alt','Control','CapsLock', 'Shift'];
        if(forbidkey.includes(key)) {
            return ;
        }
        else {
            switch(key) {
                case "Escape":
                    setFocusCell([rowID, colID]);
                    setActiveCell([null,null]);
                    break;
                case "Enter":
                    if(mathMode) {
                        let computedVal = evaluateCellValue(rowID,colID);
                        let mathEquation = newSheet[rowID][colID].value;
                        console.log("math", mathEquation);
                        newSheet[rowID][colID] = {...newSheet[rowID][colID], value: computedVal, mathEquation: mathEquation}
                    } 
                    
                    if(rowID+1 >= sheetData.length) return;

                    setMathCell([null,null]); // exit math mode

                    setActiveCell([null,null]);
                    setFocusCell([rowID+1, colID]);
                    document.getElementById(`${rowID},${colID}`).blur();
                    document.getElementById(`${rowID+1},${colID}`).focus();
                    document.getElementById(`${rowID+1},${colID}`).scrollIntoView({block: "center"});
                    break;
                case "Tab":
                    if(colID+1 >= sheetData[0].length) return;
                    setActiveCell([null,null]);
                    setFocusCell([rowID, colID+1]);
                    document.getElementById(`${rowID},${colID}`).blur();
                    document.getElementById(`${rowID},${colID+1}`).focus();
                    document.getElementById(`${rowID},${colID+1}`).scrollIntoView({block: "center"});
                    break;
                default:
                    if(key === "=") {
                        if(content === "" || content === " ") {
                            // enter math mode
                            newSheet[rowID][colID] = {...newSheet[rowID][colID], displayMathEquation: true};
                            setMathCell([rowID, colID]);
                        }
                    }
                    else if(key === "Backspace"){
                        if(content.trim() === "=") {
                            console.log("exit math mode");
                            setMathCell([null, null]);
                            newSheet[rowID][colID] = {...newSheet[rowID][colID], value: " ", displayMathEquation: false};
                        }
                    }
                    else {
                        newSheet[rowID][colID] = {...newSheet[rowID][colID], value: content };
                    }
                    
            }
        }
        setSheetData(newSheet);
    }

    const addRow = () => {
        let rowToAdd = focusCell[0];
        let colindex = focusCell[1];
        if (rowToAdd == null || colindex == null) return;
        if (rowToAdd === 0 || colindex === 0) return;

        let colCount = sheetData[0].length;
        let rowCount = sheetData.length;
        let newSheetAfterAddRow = [...sheetData];

        newSheetAfterAddRow.splice(rowToAdd, 0, new Array(colCount).fill({focus: false, active: false, value: " ", focusHasData: false}))

        setFocusCell([rowToAdd, colindex]);

        for(let i = 1; i < rowCount + 1; i++) {
            newSheetAfterAddRow[i][0] = {...newSheetAfterAddRow[i][0], value: i};
        }

        setSheetData(newSheetAfterAddRow);
    }

    const addCol = () => {

        let rowindex = focusCell[0];
        let colToAdd = focusCell[1];

        if (rowindex == null || colToAdd == null) return;
        if (rowindex === 0 || colToAdd === 0) return;

        let newSheetAfterAddCol = [...sheetData];
        let rowCount = sheetData.length;
        let colCount = sheetData[0].length;

        for(let i = 1; i < rowCount; i++) {
            newSheetAfterAddCol[i].splice(colToAdd, 0, {focus: false, active: false, value: " ", focusHasData: false});
        }

        setFocusCell([rowindex, colToAdd]);

        for(let i = 1; i < colCount + 1; i++) {
            let newChar1 = String.fromCharCode(65 + (i-1) % 26);
            if (parseInt((i - 1) / 26) === 0) {
                newSheetAfterAddCol[0][i] = {...newSheetAfterAddCol[0][i], value: newChar1};;
            }
            else {
                let newChar2 = String.fromCharCode(64 + parseInt((i - 1) / 26));
                newSheetAfterAddCol[0][i] = {...newSheetAfterAddCol[0][i], value: newChar2 + newChar1};
            }
        }

        setSheetData(newSheetAfterAddCol);
    }


    const removeRow = () => {
        let rowToRemove = focusCell[0];
        let colindex = focusCell[1];
        if (rowToRemove == null || colindex == null) return;
        if (rowToRemove === 0 || colindex === 0) return;

        let colCount = sheetData[0].length;
        let rowCount = sheetData.length;
        let newSheetAfterRemoveRow = [...sheetData];

        newSheetAfterRemoveRow.splice(rowToRemove, 1);

        setFocusCell([rowToRemove, colindex]);

        for(let i = 1; i < rowCount - 1; i++) {
            newSheetAfterRemoveRow[i][0] = {...newSheetAfterRemoveRow[i][0], value: i};
        }
        
        setSheetData(newSheetAfterRemoveRow);
        
    }

    const removeCol = () => {
        let rowindex = focusCell[0];
        let colindex = focusCell[1];
        if (rowindex == null || colindex == null) return;
        if (rowindex === 0 || colindex === 0) return;

        let colCount = sheetData[0].length;
        let rowCount = sheetData.length;
        let newSheet = [...sheetData];

        for(let i = 0; i < rowCount; i++) {
            newSheet[i].splice(colindex, 1);
        }

        for(let i = 1; i < colCount - 1; i++) {
            let newChar1 = String.fromCharCode(65 + (i-1) % 26);
            if (parseInt((i - 1) / 26) === 0) {
                newSheet[0][i] = {...newSheet[0][i], value: newChar1};;
            }
            else {
                let newChar2 = String.fromCharCode(64 + parseInt((i - 1) / 26));
                newSheet[0][i] = {...newSheet[0][i], value: newChar2 + newChar1};
            }
        }

        setFocusCell([rowindex, colindex]);
        setSheetData(newSheet);
    }


    const handleInputOnchange = (e) => {
        let newSheet = [...sheetData];
        let rowID = parseInt(e.target.getAttribute('rowid'));
        let colID = parseInt(e.target.getAttribute('colid'));
        let content = e.target.value;
        newSheet[rowID][colID] = {...newSheet[rowID][colID], value:content};
        setSheetData(newSheet);
    }

    const evil = (fn) => {
        return new Function('return ' + fn)();
    }

    const evaluateCellValue = (X, Y) => {
        let contentToBeCompute = sheetData[X][Y].value;
        contentToBeCompute = contentToBeCompute.replace("=", " ").trim();
        let resultVal = 0;
        let outcome;
        try {
            outcome = evil(contentToBeCompute);
        }
        catch(ERR) {
            outcome  = "ERROR!";
        }
        
        return outcome;
    }

    return (
        <>
            <div className="control">
                <Button size="large" variant="contained" color="primary"  className="button" onClick={addRow}>ROW+</Button>
                <Button size="large" variant="contained" color="primary"  className="button" onClick={removeRow}>ROW-</Button>
                <Button size="large" variant="contained" color="primary"  className="button" onClick={addCol}>COL+</Button>
                <Button size="large" variant="contained" color="primary"  className="button" onClick={removeCol}>COL-</Button>
            </div>
            <Main sheetData={sheetData} handleClicks={handleClicks} 
                    handleCellKeyDown={handleCellKeyDown}
                    handleInputKeyDown={handleInputKeyDown}
                    handleInputOnchange={handleInputOnchange}
            />
        </>
    )
}

export default FakeSheet
