const Query = {
  chatrooms(parent, args, { db }, info) {
    const room = db.chatrooms.find((room) => (room.name === args.query));
    return room
  },

  users(parent, args, { db }, info) {
    const user = db.users.find((user) => (user.name === args.query));
    return user
  },

};

export { Query as default };
