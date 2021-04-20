export default function Grid ({row_idx, col_idx, value}) {
    function getVal(val){
        const mapping = {'':"", 2:"NCTU", 
            4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 
            64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",
            1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 
            8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"};
        if(val === 0) return "";
        return mapping[val];
    }
    
    //let grid_id = `grid-0-0`;
    //let value_id = `value-0-0`;
    let temp_class_name = `grid level-${value}`;

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################
    let grid_id = `grid-${row_idx}-${col_idx}`;
    let value_id = `value-${row_idx}-${col_idx}`;

    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{getVal(value)}</div>
            </div>
        </td>
    );
}