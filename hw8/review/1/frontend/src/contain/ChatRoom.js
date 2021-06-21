import "../App.css";
import { useEffect, useState } from "react";
import { Tabs, Input, Tag, Badge } from "antd";
import  ChatModal  from "./ChatModal"
import useChatBox from "../hooks/useChatBox"
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CHATROOM_MUTATION } from '../graphql/index';
import ChatBox from "../component/ChatBox"

const ChatRoom = ({ me, displayStatus }) => {
  
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const addChatBox = () => { setModalVisible(true); console.log(chatBoxes) };
  const [updateChatroom] = useMutation(UPDATE_CHATROOM_MUTATION);

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

  return (
    <> 
      <div className="App-title">
        <h1>{me}'s Chat Room</h1> 
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => { 
            setActiveKey(key); 
            let index = chatBoxes.findIndex(ele=>ele.key===key)
            console.log(index)
            //changeUnread(index, 0);
            //changeChatBox(me, chatBoxes[index].friend);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if(action === "remove") {
              let key = removeChatBox(targetKey, activeKey);
              setActiveKey(key);
              if(key !== ""){
                let index = chatBoxes.findIndex(ele=>ele.key===key)
                //changeChatBox(me, chatBoxes[index].friend);
              }
            }
          }}
        >
          
          {chatBoxes.map(({friend, key, unread}, index) => {
            //console.log({friend, key})
            return(
              <Tabs.TabPane tab={<Badge count={unread}>{friend}</Badge>} 
                key={key} closable={true} > 
                <ChatBox 
                  friend={friend} 
                  akey={key} 
                  me={me} 
                  index={index}
                  />
                </Tabs.TabPane>
            )
            })}
            
        </Tabs>

        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            //changeChatBox(me, name);
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
          onSearch={(msg) => {
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
            let index = chatBoxes.findIndex(ele=>ele.key===activeKey)
            sendMessage(me, chatBoxes[index].friend, msg);
            //setChatBoxesMsg({ key: activeKey, name:me, body: msg });
            setMessageInput("");
          }}
        ></Input.Search> 
    </>);
};
export default ChatRoom;