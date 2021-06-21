import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag } from "antd";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Message from "../Components/Message";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CHATBOX_QUERY, CHATBOX_SUBSCRIPTION } from "../graphql";

const { TabPane } = Tabs;

function ChatRoom({ me, displayStatus }) {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [to, setTo] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  // const { sendMessage, messages, startChat } = useChat();
  // const { messages } = useChat();
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, { variables: { name: activeKey } });

  useEffect(() => {
    console.log("update");
    let unsubscribe = subscribeToMore({
      document: CHATBOX_SUBSCRIPTION,
      variables: { chatBoxName: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.message.data;
        if (prev.chatBox === null) {
          return { chatBox: { ...prev.chatBox, messages: [newMessage] } };
        }
        return { chatBox: { ...prev.chatBox, messages: [...prev.chatBox.messages, newMessage] } };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, activeKey]);

  const addChatBox = () => {
    setModalVisible(true);
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
          onChange={async (key) => {
            let friend = key.split("_")[0] === me ? key.split("_")[1] : key.split("_")[0];
            setTo(friend);

            await startChat({ variables: { name1: me, name2: friend } });
            setActiveKey(key);
          }}
          onEdit={async (targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              let newKey = removeChatBox(targetKey, activeKey);
              let friend = newKey.split("_")[0] === me ? newKey.split("_")[1] : newKey.split("_")[0];
              setActiveKey(newKey);
              await startChat({ variables: { name1: me, name2: friend } });
              setTo(friend);
            }
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error!</p>
                ) : data.chatBox === null ? (
                  <p>Empty</p>
                ) : data.chatBox.messages.length ? (
                  data.chatBox.messages.map((message, id) => {
                    if (message !== null) {
                      return <Message data={message} key={id} me={me} />;
                    }
                  })
                ) : (
                  <p>{friend}'s chatbox.</p>
                )}
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            let newChatBox = createChatBox(name, me);
            setTo(name);
            setActiveKey(newChatBox[0].newKey);
            await startChat({ variables: { name1: newChatBox[1].me, name2: newChatBox[1].friend } });

            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({ type: "error", msg: "Please enter massage" });
            return;
          } else if (activeKey === "") {
            displayStatus({ type: "error", msg: "Please add a chatbox first" });
            setMessageInput("");
            return;
          }
          sendMessage({ variables: { name1: me, name2: to, body: msg } });
          // sendMessage({ to: to, name: me, body: msg });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
}
export default ChatRoom;
