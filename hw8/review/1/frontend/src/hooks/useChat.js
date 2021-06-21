import { useEffect, useState } from "react";  
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_CHATROOM_MUTATION, UPDATE_CHATROOM_MUTATION, CHATROOMS_QUERY } from '../graphql/index';

const useChat = () => {
  //const [status, setStatus] = useState({}); // { type, msg }
  const status = 0;
  const [Messages, setMessages] = useState([]);
  const [createChatroom, create] = useMutation(CREATE_CHATROOM_MUTATION);
  const [updateChatroom, update] = useMutation(UPDATE_CHATROOM_MUTATION);
  const { loading, error, data, subscribeToMore } = useQuery(CHATROOMS_QUERY);

  // client.sendEvent = (e) => client.send(JSON.stringify(e));

  // const sendMessage = (name, to)=>{
  //   client.sendEvent({type:"MESSAGE", data:{name:name, to:to, body:body}}) //{ name, to, body }
  // }

  useEffect(() => {
    if(update.data){
      console.log(update.data)
      const msgs = [];
      update.data.updateChatroom.messages.map((value)=>(
        msgs.push({ name: value.sender, body: value.body })
      ))
      setMessages(msgs)
    }
  }, [update.data])

  useEffect(() => {
    if(create.data){
      console.log(create.data)
      const msgs = [];
      create.data.createChatroom.messages.map((value)=>(
        msgs.push({ name: value.sender, body: value.body })
      ))
      setMessages(msgs)
    }
  }, [create.data])

  const changeChatBox = (name, to)=>{
    const key = name <= to ?
              `${name}_${to}` : `${to}_${name}`;
    //console.log(key)
    createChatroom({
      variables: {
        name: key
      },
    })
  }
  
  const sendMessage = (name, to, msg) => {
    const key = name <= to ?
              `${name}_${to}` : `${to}_${name}`;
    updateChatroom({
      variables: {
        name: key,
        sender: name,
        body: msg
      },
    })
  };
  // client.onmessage = async (byteString)=>{
  //   const tmp = JSON.parse(byteString.data)
  //   const {type, data} = tmp
  //   // eslint-disable-next-line default-case
  //   switch(type){
  //     case"CHAT":{
  //       await setMessages(data.messages);
  //       //console.log(Messages);
  //       break
  //     }
  //     case"MESSAGE":{
  //       await setMessages((prev) => [...prev, data.message]);
  //       //console.log(Messages);
  //       break
  //     }
  //   }
  // }


  return { status, Messages, sendMessage, changeChatBox };
};
export default useChat;
