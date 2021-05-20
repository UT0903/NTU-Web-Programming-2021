import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => { },
  addRegularMessage: () => { },
  addErrorMessage: () => { },
  sortMessage: () => { },
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (message) => {
    setMessages([makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {
    setMessages([
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
  };

  const addErrorMessage = (message) => {
    setMessages([makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const sortMessage = (sortType, sortString) => {
    let myData = messages.map((m) => {
      return {
        name: m.message.split(/, |: /)[1],
        subject: m.message.split(/, |: /)[3],
        score: parseInt(m.message.split(/, |: /)[5]),
      }
    });
    if (sortType === "descend") {
      myData.sort((a, b) => {
        if (a[sortString] > b[sortString]) return -1;
        if (a[sortString] < b[sortString]) return 1;
        return 0;
      });
    }
    else {
      myData.sort((a, b) => a[sortString] > b[sortString] ? 1 : -1);
    }
    myData = myData.map((m) => { return makeMessage(`Name: ${m.name}, Subject: ${m.subject}, Score: ${m.score}`, REGULAR_MESSAGE_COLOR)})
    console.log(myData);
    setMessages(myData);
  }

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        sortMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
