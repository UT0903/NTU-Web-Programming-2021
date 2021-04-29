import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const errorHandler = async (func) =>{
    try{
      await func();
      return true;    
    }
    catch(error){
      alert('server not responding or not connected')
      return false;
    }
  }
  const startMenu = (
    <div>
      <button
        onClick={async () => {
          let ret = await errorHandler(startGame);
          if(ret) setHasStarted(true);
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          let ret = await errorHandler(restart)
          if (ret){
            setHasWon(false);
            setStatus('');
            setNumber('');
          }
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    const msg = await guess(number);
    console.log(msg);
    if (msg === 'Equal'){
      setHasWon(true);
      setStatus('Equal')
    }
    else{
      setStatus(msg)
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return (
  <div className="App">
      {hasStarted ? game : startMenu}
  </div>
  );
}

export default App
