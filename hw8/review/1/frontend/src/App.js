
import "./App.css";
import { useState, useEffect } from "react";
import SignIn from "./contain/SignIn"
import ChatRoom from "./contain/ChatRoom"
import {message} from 'antd'

const displayStatus=(payload)=>{
  if(payload.msg){
    const {type, msg}=payload;
    const content={
      content:msg, duration:5
    }
    switch(type){
      case"success":
        message.success(content)
        break;
      case"error":

      default:
        message.error(content)
        break;
    }
  }
}

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);


const App = () => {
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);

  return (
    <div className="App">
      {signedIn? (
        <ChatRoom me={me} displayStatus={displayStatus}/>) 
        :(<SignIn 
          me={me}
          setMe={setMe} 
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />)}
    </div>
  );
};
export default App;
