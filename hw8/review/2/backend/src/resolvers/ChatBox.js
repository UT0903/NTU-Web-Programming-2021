import { MessageModel } from "../db";
import { UserModel } from "../db";
const ChatBox = {
  messages(parent, args, { db }, info) {
    return Promise.all(parent.messages.map((mId) => MessageModel.findById(mId)));
  },

  users(parent, args, { db }, info) {
    return Promise.all(parent.users.map((mId) => UserModel.findById(mId)));
  },
};

export { ChatBox as default };
