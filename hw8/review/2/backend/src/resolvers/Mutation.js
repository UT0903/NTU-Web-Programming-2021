import { makeName, validateUser, validateChatBox } from "../utility";
import { MessageModel } from "../db";

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    if (!name1 || !name2) {
      throw new Error("Missing chatBox name for CreateChatBox");
    }
    // if (!(await checkUser(db, name1, "createChatBox"))) {
    //   console.log("User does not exist for createChatBox: " + name1);
    //   await newUser(db, name1);
    // }

    const chatBoxName = makeName(name1, name2);
    const sender = await validateUser(name1);
    const receiver = await validateUser(name2);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
    console.log("create chatBox success");
    return chatBox;
  },

  async createMessage(parent, { name1, name2, body }, { db, pubsub }, info) {
    if (!name1 || !name2) {
      throw new Error("Missing sender or receiver for createMessage");
    }
    if (!body) {
      throw new Error("Missing content for createMessage");
    }
    const chatBoxName = makeName(name1, name2);
    const sender = await validateUser(name1);
    const receiver = await validateUser(name2);
    const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

    const newMessage = new MessageModel({ sender, body });
    await newMessage.save();
    chatBox.messages.push(newMessage);
    await chatBox.save();
    console.log("mut: ", chatBoxName);
    pubsub.publish(`Messages ${chatBoxName}`, {
      message: { mutation: "CREATED", data: newMessage },
    });

    return newMessage;
  },
};

export { Mutation as default };
