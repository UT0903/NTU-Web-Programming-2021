import "../App.css";
import ChatModal from "../Components/ChatModal"
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import { List, Typography, Divider } from 'antd';
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;
const ChatRoom = ({me, displayStatus, server}) => {
  
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("")  
  
  const addChatBox = () => { setModalVisible(true); };

  // const server = new WebSocket('ws://localhost:8080')
  const { chatBoxes, createChatBox, removeChatBox} = useChatBox();
  const { chatMessages, sendMessage, openChat} = useChat(server)
  // const [server_msg, setServer_msg] = useState([])

 
  // server.onmessage = (msg)=>{
  //   // console.log(chatBoxes)
    
  //   msg = JSON.parse(msg.data)
  //   const {type, data} = msg
  //   const { messages } = data
  //   console.log("out",chatBoxes)
  //   updateChatLog(messages, type, chatBoxes)
  //   // switch(type){
  //   //   case "CHAT":{
  //   //     updateChatLog(activeKey, messages, "CHAT")
  //   //     // chatLog = messages
  //   //     // console.log("CHAT: ", chatLog)
  //   //     break
  //   //   }
  //   //   case "MESSAGE":{
  //   //     updateChatLog(activeKey, messages, "MESSAGE");
  //   //     break
  //   //   }
  //   //   default:
  //   //     break;
  //   // }
  // }

  useEffect( ()=>{
    if (activeKey !== ""){
      openChat(me, activeKey);
    }
  }, [activeKey] )



  // {chatLog.length === 0? 
  //   (<p>{friend}'s chatbox.</p>)
  //   :
  //   (chatLog.map(({name, body})=>{
  //     return(
  //       name === friend?
  //         (<List.Item key={key+body}>
  //           <Typography.Text mark>{name}</Typography.Text> {body}
  //         </List.Item>)
  //         :
  //         (<List.Item style={{float: 'right'}} key={key+body}>
  //           {body} <Typography.Text mark>{name}</Typography.Text> 
  //         </List.Item>)
  //     )
  //   }))
  // } 
  console.log(chatMessages)
  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs type="editable-card" 
          onEdit={(targetKey, action) => { 
            if (action === "add") addChatBox();
            else if(action === "remove") setActiveKey(removeChatBox(activeKey, targetKey));
          }}
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }} 
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
              return (
                <TabPane tab={friend} key={key} closable={true}>
                  {key === activeKey?
                    (chatMessages.length ===0?
                      (<p>{friend}'s chatbox.</p>) :
                      chatMessages.map(({name , body})=>{
                      return(
                        name !== me?
                          (<List.Item >
                            <Typography.Text mark>{name}</Typography.Text> {body}
                          </List.Item>)
                          :
                          (<List.Item style={{textAlign: 'right'}} >
                            {body} <Typography.Text mark>{name}</Typography.Text> 
                          </List.Item>)
                      )
                    }))
                    : null
                  }
                </TabPane>
                
              );
            })
          }
        </Tabs>
        <ChatModal
          visible={modalVisible}
          
          onCreate={({ name }) => {
            setActiveKey(createChatBox(me, name));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />

        </div>
        <Input.Search
          value={messageInput}
          onChange={(e) => 
            setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder=
            "Enter message here..."
          onSearch={async(msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter message.",
              });
              return;
            } else if (activeKey === "") {
              displayStatus({
                type: "error",
                msg: "Please add a chatbox first.",
              });
              setMessageInput("");
              return;
            }
            sendMessage({me, room: activeKey, body: msg });
            // console.log(a_msg)
            // updateChatLog(activeKey, a_msg);
            setMessageInput("");
          }}
        ></Input.Search> 
    </>);
  };
  export default ChatRoom;
  