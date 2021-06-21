import { ChatBoxModel } from "../db";
const Query = {
  async chatBox(parent, { name }, { db }, info) {
    const result = await ChatBoxModel.findOne({ name });

    return result;
  },
};

export { Query as default };
