import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')
  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  console.log(`guess: ${number}`)
  let ret;
  try{
    ret = await instance.get('/guess', { params: { number } })
    console.log(ret)
    return ret.data.msg
  }
  catch (error){ 
    console.log(error)
    if(error.message === 'Network Error'){
      alert('server not responding or not connected')
      return ''
    }
    else{
      return `Error: ${number} is not a valid number (1 - 100)`
    }
  }
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')
  return msg
}

export { startGame, guess, restart }
