const Room = require("../models/room.schema");
const User = require("../models/user.schema");
const { getReceiverSocketId, io } = require("../socket/socket");

const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const getRoomById = async (req, res) => {
  try {
    const { _id } = req.body;
    const room = await Room.findOne({
      _id
    })
    if (!room) res.status(200).json([]);
    else res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRoom = async (req, res) => {
  const { userId } = req.body;
  let code;
  let isCodeExist = true;
  try {
    do {
      code = makeid(6);
      isCodeExist = await Room.findOne({ code: code });
    } while (isCodeExist);
    const newRoom = new Room({
      code,
      users: [userId],
    });
    await newRoom.save();
    res.status(200).json(newRoom);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const joinRoom = async (req, res) => {
  const { code, userId } = req.body;
  try {
    const isUserExist = await User.findOne({ _id: userId });
    if (!isUserExist) {
      res.status(400).json({ error: "User not Found" });
      return;
    }
    const isRoomExist = await Room.findOne({ code: code });
    // VERIFICATIONS
    // console.log(isRoomExist);
    if (!isRoomExist) {
      res.status(400).json({ error: "Room Code incorrect" });
      return;
    }
    if (isRoomExist.status !== "pending") {
      res.status(400).json({ error: "Can't join." });
      return;
    }
    if (isRoomExist.users.length > 1) {
      if (!isRoomExist.users.find((id) => id.equals(userId))) {
        res.status(400).json({ error: "Room Full." });
        return;
      } else {
        const receiverSocketId = getReceiverSocketId(
          isRoomExist.users.filter((id) => !id.equals(userId))
        );
        if (receiverSocketId) {
          console.log(receiverSocketId);
          console.log(
            `Player ${isUserExist.username} join room : ${isRoomExist.code}`
          );
          io.to(receiverSocketId).emit("newPlayer", isUserExist.username);
        }
        res.status(200).json({ room: isRoomExist });
        return;
      }
    }
    // END VERIFICATIONS

    isRoomExist.users.push(userId);
    await isRoomExist.save();
    const receiverSocketId = getReceiverSocketId(isRoomExist.users[0]);
    if (receiverSocketId) {
      console.log(receiverSocketId);
      console.log(
        `Player ${isUserExist.username} join room : ${isRoomExist.code}`
      );
      io.to(receiverSocketId).emit("newPlayer", isUserExist.username);
    }
    res.status(200).json({ room: isRoomExist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const startRoom = async (req, res) => {};

module.exports = {
  makeid,
  createRoom,
  joinRoom,
  getRoomById,
  startRoom,
};
