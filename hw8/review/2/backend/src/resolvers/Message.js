import { UserModel } from "../db";

const Message = {
  sender(parent, args, { db }, info) {
    return UserModel.findById(parent.sender);
  },
};

export { Message as default };
