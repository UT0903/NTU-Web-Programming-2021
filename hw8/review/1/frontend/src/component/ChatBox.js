import React, {useEffect} from 'react'
import { Tag, Tabs, Badge } from "antd";
import { useQuery } from '@apollo/react-hooks';
import { CHATROOMS_QUERY, CHATROOMS_SUBSCRIPTION } from "../graphql/index"
import "../App.css";

const ChatBox = (props) => {
    const { friend, akey, me, index, set } = props
    const { data, subscribeToMore } = useQuery(CHATROOMS_QUERY, {
        variables: { query: akey },
      });
    var unread = 0;

    useEffect(() => {
        try {
          subscribeToMore({
            document: CHATROOMS_SUBSCRIPTION,
            variables: { name: akey },
            updateQuery: (prev, { subscriptionData }) => {
              console.log("prev=", prev)
              console.log("data=", subscriptionData.data)
              if (!subscriptionData.data) return prev;
              const newMsg = subscriptionData.data.chatroom.data.messages;
              //set(index, 1);
              if(newMsg.sender != me)
                console.log(index, "plus 1")
              return {
                ...prev,
                messages: newMsg,
              };
            },
          });
        } catch (e) {}
      }, [akey, subscribeToMore]);
    
    return(
        <>
            <p>{friend}'s chatbox.</p>
            <div className="App-messages">
                {data?
                data.chatrooms.messages.map(({sender, body}, i)=>(
                    sender===me?
                <p key={i}>
                    {body}<Tag color={'blue'}>{sender}</Tag>
                </p>:
                <p key={i}>
                    <Tag color={'green'}>{sender}</Tag>{body}
                </p>
                )):null}
            </div>
        </>
    )
}

export default ChatBox;