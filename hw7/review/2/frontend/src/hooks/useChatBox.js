import {useState} from "react";

const useChatBox = ()=>{

  // let key_Mary = me <= "Mary" ?  `${me}_Mary` : `Mary_${me}`
  // let key_Peter = me <= "Peter" ?  `${me}_Peter` : `Peter_${me}`
  // const [chatBoxes, setChatBoxes] = useState([
  //   { friend: "Mary", key: key_Mary, 
  //     chatLog: [] },
  //   { friend: "Peter", key: key_Peter, 
  //     chatLog: [] }
  // ]);
  const [chatBoxes, setChatBoxes] = useState([]);

  const createChatBox = (me, friend) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    
    // const message = {type:"CHAT", data:{ name: me, to: friend}}
    // server.send(JSON.stringify(message));

    const chatLog = []
    // const chatLog = [{name: friend, body: "Testing"}, {name: me, body: "Success!"}];

    //   server.onmessage = (msg) =>{
    //     msg = JSON.parse(msg.data)
    //     const {type, data} = msg
    //     const { messages } = data
    //     chatLog = messages
    //       console.log("out",chatBoxes)
    //     //   updateChatLog(messages, type, chatBoxes)
    //   }
    // }

    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    return newKey;
  };


  // server.onmessage = async (msg)=> {
  //   console.log("onmessage")
  //   console.log(chatBoxes)
  //   msg = JSON.parse(msg.data)
  //   const {type, data} = msg
  //   switch(type){
  //     case "CHAT":{
  //       const { messages } = data

  //       const newChatBoxes = [...chatBoxes];
  //       console.log("server called")
  //       console.log(chatBoxes)
        
  //       // newChatBoxes.forEach( (key, chatLog)=>
  //       //   {if (key === activeKey){
  //       //     chatLog = msg
  //       //   }}
  //       // )
  //       for (var i = 0; i < newChatBoxes.length; i++){
  //         if (newChatBoxes[i].key === activeKey){
  //           newChatBoxes[i].chatLog = msg;
  //         }
  //       }
  //       setChatBoxes(()=>newChatBoxes);
  //       // chatLog = messages
  //       // console.log("CHAT: ", chatLog)
  //       break
  //     }
  //     default:
  //       break;
  //   }
  // }


  // const updateChatLog = (msg, type, oldChatBox) => {
  //   switch(type){
  //     case "CHAT":{
  //       // if (!chatBoxes.some(({ key }) => key === activeKey)) {
  //       //   throw new Error("No thiis chatBox: ", activeKey);
  //       // }

  //       // const newChatBoxes = [...chatBoxes];
  //       // console.log("server called")
  //       // console.log(oldChatBox)
        
  //       // newChatBoxes.forEach( (key, chatLog)=>
  //       //   {if (key === activeKey){
  //       //     chatLog = msg
  //       //   }}
  //       // )
        

  //       // for (var i = 0; i < newChatBoxes.length; i++){
  //       //   if (newChatBoxes[i].key === activeKey){
  //       //     newChatBoxes[i].chatLog = msg;
  //       //   }
  //       // }
  //       // setChatBoxes(newChatBoxes);
  //       break;
  //     }
  //     case "MESSAGE":{
  //       break;

  //     }
  //     default:
  //       break;
  //   }
  //   // console.log(chatBoxes)
  //   // const newChatBoxes = [...chatBoxes]
  //   // const box = newChatBoxes.find( ({key}) => key === activeKey)
  //   // box.chatLog.push(a_msg)
  //   // // newChatBoxes.find( ({key})=> key === activeKey) = box
  //   // console.log(newChatBoxes)
  // }


  const removeChatBox = (activeKey, targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return newActiveKey;
  };



  return {chatBoxes, createChatBox, removeChatBox};
};

export default useChatBox