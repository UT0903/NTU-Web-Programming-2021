import express from 'express'
import fs from 'fs'
let file_name
const getCurTime = (date_ob) => {
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return (year + "-" + month + "-" + date + "-" + hours + "-" + minutes);
}
const getCurTimeSec = (date_ob) => {
    return getCurTime(date_ob) + "-" + date_ob.getSeconds();
}
const writeLog = (write_msg, forceRestart= false) => {
    console.log('write log:', write_msg)
    if(forceRestart){
        try{
            if (!fs.existsSync('./server/logs')){
                fs.mkdirSync('./server/logs', '0777')
                console.log('mkdir finish!')
            }
        }
        catch(error){}
        finally{
            file_name = `./server/logs/${getCurTimeSec(new Date())}.log`
        }
    }
    else{
        fs.appendFile(file_name, write_msg + getCurTimeSec(new Date()) + '\n', function (err) {
            if (err)
                console.log(err);
            else
                console.log('Append operation complete.');
        });
    }
}
export default writeLog;