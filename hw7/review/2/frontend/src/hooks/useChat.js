import { useState } from "react";  
const useChat = (server) => {
  // const server = new WebSocket('ws://localhost:8080')
  const [status, setStatus] = useState({}); // { type, msg }
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = (payload) => {
    const {me, room, body} = payload
    const tmp = room.split('_');
    const to = tmp[0] === me? tmp[1]: tmp[0]
    const data = { name: me, to, body }
    // console.log("data",data)
    // server.onopen = () => 
    server.send(JSON.stringify({type: "MESSAGE", data}))
    
  }; // { key, msg }

  const openChat = (me, activeKey)=>{
    const tmp = activeKey.split('_');
    const to = tmp[0] === me? tmp[1]: tmp[0]
    const msg = {type:"CHAT", data:{ name: me, to}}
    // server.onopen = () => 
    server.send(JSON.stringify(msg))
    setChatMessages([{body:"Loading..."}]);
  }

  server.onmessage = (msg)=>{
    // console.log(msg.data)
    msg = JSON.parse(msg.data)
    const {type, data} = msg
    switch(type){
      case "CHAT":{
        const { messages } = data
        setChatMessages(messages)
        break
      }
      case "MESSAGE":{
        console.log("chatLog", chatMessages)
        const { message } = data
        console.log("MESSAGE", message)
        const newChatMessages = [...chatMessages]
        newChatMessages.push(message)
        setChatMessages(newChatMessages);
        break
      }
      default:
        break;
    }
  }

  return {chatMessages, sendMessage, openChat};
};
export default useChat;
