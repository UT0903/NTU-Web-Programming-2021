let number
function generateRandom(max){
  return Math.floor(Math.random() * max);
}


const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(number === undefined || forceRestart === true)
    number = generateRandom(99);
  return number+1;
}

export default getNumber
