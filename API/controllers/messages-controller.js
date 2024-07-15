const Message = require("../models/message.schema");
const Conversation = require("../models/conversation.schema");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message, id: senderId } = req.body;
    const { id: receiverId } = req.params;
    let conversation = await Conversation.findOne({
      users: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        users: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      message,
      senderId,
      receiverId,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      console.log(receiverSocketId);
      console.log("New message to emit : ", newMessage);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: senderId } = req.body;
    const { id: receiverId } = req.params;
    const conversation = await Conversation.findOne({
      users: { $all: [senderId, receiverId] },
    })
      .populate("messages")
      .populate("users");
    if (!conversation) res.status(200).json([]);
    else res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { id: senderId } = req.body;
    const { id: receiverId } = req.params;
    const conversation = await Conversation.findOne({
      users: { $all: [senderId, receiverId] },
    })
      .populate("messages")
      .populate("users");
    if (!conversation) res.status(200).json([]);
    else res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getConversationById = async (req, res) => {
  try {
    const { _id } = req.body;
    const conversation = await Conversation.findOne({ _id })
      .populate("messages")
      .populate("users");
    if (!conversation) res.status(200).json([]);
    else res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getConversation,
  getConversationById,
};
