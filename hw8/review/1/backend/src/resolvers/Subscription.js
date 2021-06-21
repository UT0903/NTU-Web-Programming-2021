const Subscription = {
  chatroom: {
    subscribe(parent, { name }, { db, pubsub }, info) {
      const chatroom = db.chatrooms.find(
        (chatroom) => chatroom.name === name,
      );

      if (!chatroom) {
        throw new Error('Chatromm not found');
      }

      return pubsub.asyncIterator(`chatroom-${name}`);
    },
  }
};

export { Subscription as default };
