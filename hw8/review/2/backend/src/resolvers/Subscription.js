import { ChatBoxModel } from "../db";

const Subscription = {
  message: {
    async subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
      let chatBox = await ChatBoxModel.findOne({ name: "a_b" });
      chatBox = await chatBox.populate("users").populate({ path: "messages", populate: "sender" }).execPopulate();

      if (!chatBox) {
        throw new Error(`Fetching messages fail, chatBox name ${chatBoxName} not found.`);
      }
      console.log("sub: ", chatBoxName);
      return pubsub.asyncIterator(`Messages ${chatBoxName}`);
    },
  },
};

export { Subscription as default };
