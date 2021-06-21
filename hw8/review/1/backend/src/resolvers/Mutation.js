import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const one = db.users.find((user) => (user.name === args.name))
    if(one) return one;

    const user = {
      id: uuidv4(),
      name: args.name
    };

    db.users.push(user);

    return user;
  },
  
  createChatroom(parent, args, { db, pubsub }, info) {
    const room = db.chatrooms.find((room) => (room.name === args.name))
    if(room) return room;

    const chatroom = {
      id: uuidv4(),
      name: args.name,
      messages: []
    };

    db.chatrooms.push(chatroom);

    return chatroom;
  },

  updateChatroom(parent, args, { db, pubsub }, info) {
    const { name, data } = args;
    const chatroom = db.chatrooms.find((chatroom) => chatroom.name === name);
    const originalChatroom = { ...chatroom };

    if (!chatroom) {
      throw new Error('Chatroom not found');
    }

    if(!data.sender || !data.body){
      throw new Error('ERROR:no message data');
    }
    
    const message = {
      id: uuidv4(),
      sender: data.sender,
      body: data.body
    }

    chatroom.messages.push(message)

    pubsub.publish(`chatroom-${chatroom.name}`, {
      chatroom: {
        mutation: 'UPDATED',
        data: chatroom,
      },
    });

    return chatroom;
  },
  
};

export { Mutation as default };
