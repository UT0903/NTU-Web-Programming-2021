import { useState } from "react"; 
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CHATROOM_MUTATION } from '../graphql/index';

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const [createChatroom] = useMutation(CREATE_CHATROOM_MUTATION);

    const changeUnread = (index, num) => {
      setChatBoxes((pre)=>{
        const newState = pre
        if(num)
          newState[index].unread += 1
        else
          newState[index].unread = 0
        return newState
      })
    }

    const createChatBox = (friend, me) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend + "'s chat box has already opened.");
        }
        const newChatBoxes = chatBoxes;
        newChatBoxes.push({ friend, key: newKey, unread: 0 });
        createChatroom({
          variables: {
            name: newKey
          },
        })
        setChatBoxes(newChatBoxes);
        return newKey;
      };
    const removeChatBox = (targetKey, activeKey) => {
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

  return { chatBoxes, createChatBox, removeChatBox, changeUnread };
};
export default useChatBox;
