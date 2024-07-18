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
      _id,
    }).populate("users");
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
    await User.findOneAndUpdate({ _id: userId }, { ready: false });
    res.status(200).json(newRoom);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const joinRoom = async (req, res) => {
  const { code, userId } = req.body;
  try {
    const isUserExist = await User.findOneAndUpdate(
      { _id: userId },
      { ready: false }
    );
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
          isRoomExist.users.find((id) => !id.equals(userId))
        );
        if (receiverSocketId) {
          console.log(isRoomExist.users);
          // console.log(receiverSocketId);
          console.log(
            `Player ${isUserExist.username} join room : ${isRoomExist.code}`
          );
          io.to(receiverSocketId).emit("join", isUserExist);
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
      io.to(receiverSocketId).emit("join", isUserExist);
    }
    res.status(200).json({ room: isRoomExist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const playerReady = async (req, res) => {
  // console.log(req.body);
  const { code, userId } = req.body;
  try {
    // console.log(userId);
    const isUserExist = await User.findOne({ _id: userId });
    if (isUserExist.ready) isUserExist.ready = false;
    else isUserExist.ready = true;
    isUserExist.save();
    const isRoomExist = await Room.findOne({ code });
    console.log(isUserExist);
    let receiverSocketId;
    isRoomExist.users.map((_id, idx) => {
      receiverSocketId = null;
      receiverSocketId = getReceiverSocketId(_id);
      console.log(receiverSocketId);
      if (receiverSocketId) {
        console.log(receiverSocketId);
        console.log(`Player ${isUserExist.username} is ready !`);
        io.to(receiverSocketId).emit("ready", isUserExist);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const startRoom = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  try {
    const thisRoom = await Room.findOneAndUpdate(
      { code },
      { status: "prepare_battle" }
    );
    let receiverSocketId;
    if (thisRoom) {
      thisRoom.users.map((_id, idx) => {
        receiverSocketId = null;
        receiverSocketId = getReceiverSocketId(_id);
        console.log(receiverSocketId);
        if (receiverSocketId) {
          console.log(receiverSocketId);
          io.to(receiverSocketId).emit("start", thisRoom);
        }
      });
    }
  } catch (e) {
    res.status(400).json({ e: error.message });
  }
};

const setBattleMap = async (roomId, userId, map) => {
  let thisRoom = await Room.findOne({ _id: roomId });
  // console.log(thisRoom);
  if (thisRoom) {
    if (thisRoom.maps.length > 1) return false;
    if (thisRoom.maps.length === 0) {
      thisRoom.maps.push({
        user: userId,
        map,
      });
      await thisRoom.save();
    } else {
      let isAlreadyExist = false;
      thisRoom.maps.map((map, idx) => {
        if (map.user === userId) isAlreadyExist = true;
      });
      if (isAlreadyExist) return false;
      thisRoom.maps.push({
        user: userId,
        map,
      });
      await thisRoom.save();
    }
    console.log(thisRoom.maps);
    if (thisRoom.maps.length >= 2) {
      thisRoom.status = "battle";
      await thisRoom.save();
      console.log("BATTLE BEGIN");
      let receiverSocketId;
      thisRoom.users.map((_id, idx) => {
        receiverSocketId = null;
        receiverSocketId = getReceiverSocketId(_id);
        // console.log(receiverSocketId);
        if (receiverSocketId) {
          // console.log(receiverSocketId);
          io.to(receiverSocketId).emit("battle", thisRoom);
        }
      });
    }
  }
};

const PreparationsCompleted = async (req, res) => {
  // console.log(req.body);
  const { roomId, userId, map } = req.body;
  setBattleMap(roomId, userId, map);
  res.send({ message: "Reçu" });
};

module.exports = {
  makeid,
  createRoom,
  joinRoom,
  getRoomById,
  startRoom,
  playerReady,
  PreparationsCompleted,
};
