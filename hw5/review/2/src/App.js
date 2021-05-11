import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [upperbound, setUpper] = useState(100)
  const [lowerbound, setLower] = useState(1)

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          let msg = "";
          msg = await startGame();
          if(msg !== "Server is closed, You should wait Server restart to continue the game!"){
            setHasStarted(true);
            setStatus(msg);
          }
            else {
            setStatus(msg);
          }
        }}
      >
        start game
      </button>
      <p>{status}</p>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          let msg = await restart();
          if (msg !==  "Server is closed, You should wait Server restart to continue the game!"){
            setHasWon(false)
            setStatus('')
            setNumber('')
            setUpper(100)
            setLower(1)
          }
          else{
            setStatus( "Server is closed, You should wait Server restart to continue the game!")
          }
        }}
      >
        restart
      </button>
      <p>{status}</p>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess =  async() => {
      let msg;  
      msg=await guess(number);
      //console.log(msg);
      setNumber(number);
      if (msg === "Equal"){
        setHasWon(true);
        setStatus("");
      }
      else if (msg === "Bigger"){
        setLower(number);
        setStatus(msg);
      }
      else if (msg === "Smaller"){
        setUpper(number);
        setStatus(msg);
      }
      else{
        setStatus(msg);
        if (msg === "Server is closed, You should wait Server restart to restart the game!"){
          setLower(1)
          setUpper(100)
        }
      }

  }

  const gameMode = (
    <>
      <p>Guess a number between {lowerbound} to {upperbound}</p>
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

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
