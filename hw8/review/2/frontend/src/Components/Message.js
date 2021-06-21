import React from "react";
import { Tag } from "antd";

function Message({ data, me }) {
  return (
    <p className={`App-message ${data.sender.name === me ? "App-message-me" : ""}`} key={data.id}>
      {data.sender.name === me ? data.body : <></>}
      <Tag color="blue" style={{ marginLeft: "10px", marginRight: "10px" }}>
        {data.sender.name}
      </Tag>
      {data.sender.name === me ? <></> : data.body}
    </p>
  );
}

export default Message;
