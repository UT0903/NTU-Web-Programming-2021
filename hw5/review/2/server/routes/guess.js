import express from 'express'
import { guess } from '../../src/axios'
import getNumber from '../core/getNumber'

const router = express.Router()
var fs = require("fs");
var regex = /^[0-9\s]*$/;
function gettime (date){
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let time = `${year}-${month}-${day}-${h}-${m}-${s}` 
  return time;
}



const starttime = new Date();
var firststart = true;

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}


// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  let number = getNumber(true)
  let time = gettime(starttime);
  if (firststart === true){
    firststart = false;
    fs.writeFile(`./server/log/${time}.log`, `start number=${number} ${time}\n`, function(err) {
    //console.log(err)
  })
  }
  fs.writeFile(`./server/log/${time}.log`, `start number=${number} ${time}\n`, function(err) {
  //  console.log(err)
  })
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  //console.log(number);
  let time = gettime(starttime);
  let now = gettime(new Date()); 
  if (firststart === true){
    firststart = false;
    fs.writeFile(`./server/log/${time}.log`, `start number=${number} ${time}\n`, function(err) {
   // console.log(err)
  })
  }
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    console.log(1)
    res.status(400).send({ msg: 'Not a legal number.' })
    if(!regex.test(number)){
    console.log(number)
    fs.appendFile(`./server/log/${time}.log`, `guess an invalid number ${number} ${now}\n`, function(err) {
      //console.log(err)
    })  
    }
    else 
      fs.appendFile(`./server/log/${time}.log`, `guess an invalid number ${guessed} ${now}\n`, function(err) {
    //console.log(err)
  })  
    
  }
  else {
  console.log(2)
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
  fs.appendFile(`./server/log/${time}.log`, `guess ${guessed} ${now}\n`, function(err) {
  }) 
  if (guessed === number){
    res.status(200).send( {msg: "Equal"})
    fs.appendFile(`./server/log/${time}.log`, `end-game\n`, function(err) {
   //   console.log(err)
  }) 
    //console.log("==")
  }
  else if (guessed > number){
    res.status(200).send({msg:"Smaller"})
    //console.log(">")
  }
  else {
    res.status(200).send({msg:"Bigger"})
    //console.log("<")
  }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  let number = getNumber(true);
  let time = gettime(starttime);
  let now = gettime(new Date()); 
  fs.appendFile(`./server/log/${time}.log`, `restart number=${number} ${now}\n`, function(err) {
    //console.log(err)
  }) 
  res.json({ msg: 'The game has restarted.' })
})

export default router
