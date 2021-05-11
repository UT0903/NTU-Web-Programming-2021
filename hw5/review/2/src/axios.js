import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
var regex = /^[0-9\s]*$/;
const startGame = async () => {
  try{
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
  }
  catch (e){
    return "Server is closed, You should wait Server restart to continue the game!"
  }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try{
    if(!regex.test(number)){
      console.log(typeof(number));
      return `Error: ${number} is not a valid number (1 - 100)`
    }
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  }
  catch (error){
    //console.log((error.toString()).indexOf('Error: Request failed with status code 400Not a legal number.'));
    if((error.toString()).indexOf('400') !== -1)
      return `${number} is not a valid number (1 - 100)`;
    else{
      return "Server is closed, You should wait Server restart to restart the game!"
    }
  }
  //猜測是用 get，而不是 post，因為並不會更改 server 端的值

}

const restart = async () => {
  try{
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
  }
  catch (e){
    return "Server is closed, You should wait Server restart to continue the game!"
  }
}

export { startGame, guess, restart }
