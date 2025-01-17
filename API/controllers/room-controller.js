const Room = require("../models/room.schema");
const User = require("../models/user.schema");
const { getReceiverSocketId, io } = require("../socket/socket");

/*******************************************************************************************/
/* Function name : makeId                                                                  */
/* Description : Generate a random alphanumeric code of the passing length                 */
/* Other functions called : -                                                              */
/*******************************************************************************************/
const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
/*******************************************************************************************/
/* Function name : getRoomById                                                             */
/* Description : Get room informations by searching it with the id                         */
/* Other functions called : -                                                              */
/*******************************************************************************************/
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
/*******************************************************************************************/
/* Function name : createRoom                                                              */
/* Description : Create a room with the user and generate a random code                    */
/* Other functions called : makeid                                                         */
/*******************************************************************************************/
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
/*******************************************************************************************/
/* Function name : joinRoom                                                                */
/* Description : Verify if user can join the room and emit corresponding message           */
/* Other functions called : getReceiverSocketId (socket.js)                                */
/*******************************************************************************************/
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
    const isRoomExist = await Room.findOne({ code: code, status: "pending" });
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
/*******************************************************************************************/
/* Function name : playerReady                                                             */
/* Description : Change user's ready status and send corresponding message on sockets      */
/* Other functions called : getReceiverSocketId (socket.js)                                */
/*******************************************************************************************/
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
/*******************************************************************************************/
/* Function name : startRoom                                                               */
/* Description : get room informations and emit Start message (go to the preparation step) */
/* Other functions called : getReceiverSocketId (socket.js)                                */
/*******************************************************************************************/
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
    res.status(400).json({ error: e.message });
  }
};
/**************************************************************************************/
/* Function name : setBattleMap                                                       */
/* Description : set the user battlemap and send the corresponding message on sockets */
/* Other functions called : getReceiverSocketId (socket.js)                           */
/**************************************************************************************/
const setBattleMap = async (roomId, userId, map, ships) => {
  let thisRoom = await Room.findOne({ _id: roomId });
  // console.log(thisRoom);
  if (thisRoom) {
    if (thisRoom.maps.length > 1) return false;
    if (thisRoom.maps.length === 0) {
      thisRoom.maps.push({
        user: userId,
        map,
        ships,
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
        ships,
      });
      await thisRoom.save();
    }
    console.log(thisRoom.maps);
    if (thisRoom.maps.length >= 2) {
      thisRoom.status = "battle";
      thisRoom.current_turn = Math.round(Math.random()); //Définition aléatoire du premier joueur
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
/***********************************************************************************/
/* Function name : PreparationCompleted                                            */
/* Description : Get information as a player had finished his preparations         */
/* Other functions called : setBattleMap                                           */
/***********************************************************************************/
const PreparationsCompleted = async (req, res) => {
  // console.log(req.body);
  const { roomId, userId, map, ships } = req.body;
  setBattleMap(roomId, userId, map, ships);
  res.send({ message: "Reçu" });
};
/***********************************************************************************/
/* Function name : Shoot                                                           */
/* Description : Verify if the shoot can be done and emit corresponding message    */
/* Other functions called : Broadcast                                              */
/***********************************************************************************/
const Shoot = async (req, res) => {
  console.log(req.body);
  const { roomId, ShooterId, X, Y } = req.body;
  try {
    const thisRoom = await Room.findOne({ _id: roomId });
    //ROOM NOT FOUND
    if (!thisRoom) {
      res.json({ error: "Room not found" });
      return;
    }
    //GAME NOT LAUNCH
    if (thisRoom.status != "battle") {
      res.json({ error: "Battle not started" });
      return;
    }
    //ROOM NOT FOUND
    if (!thisRoom.users.find((id) => id.equals(ShooterId))) {
      res.json({ error: "Shooter not in this room" });
      return;
    }
    //BAD COORDINATES
    if (X < 1 || Y < 1 || X > 10 || Y > 10) {
      res.json({ error: "Bad coordinates" });
      return;
    }
    //SHOOT IS LEGAL (Well, not in your country but...)

    //Get index of Target Map
    let idx;
    if (thisRoom.maps[0].user === ShooterId) idx = 1;
    else if (thisRoom.maps[1].user === ShooterId) idx = 0;
    else idx = -1;

    let shipIDX;
    let isSink = false;
    switch (thisRoom.maps[idx].map[X][Y].type) {
      case "ship":
        thisRoom.maps[idx].map[X][Y].type = "destroyed";
        shipIDX = thisRoom.maps[idx].map[X][Y].shipIDX;
        thisRoom.maps[idx].ships[shipIDX].Life--;
        if (thisRoom.maps[idx].ships[shipIDX].Life <= 0) isSink = true;
        break;
      case "sea":
        thisRoom.maps[idx].map[X][Y].type = "miss";
        break;
      case "border":
      case "destroyed":
      case "miss":
      default:
        break;
    }
    console.log(thisRoom.maps[idx].map[X][Y].type);
    if (thisRoom.current_turn) thisRoom.current_turn = 0;
    else thisRoom.current_turn = 1;
    await thisRoom.save();
    await Room.findOneAndUpdate(
      { _id: thisRoom._id },
      { current_turn: thisRoom.current_turn, maps: thisRoom.maps }
    );
    console.log(thisRoom.maps[idx].map[X][Y].type);
    res.send({ message: thisRoom.maps[idx].map[X][Y].type, sink: isSink });

    //Game is finished ?
    let isFinish = true;
    thisRoom.maps[idx].map.map((Row) => {
      Row.map((Tile) => {
        if (Tile.type === "ship") isFinish = false;
      });
    });
    //Send response
    if (isFinish) {
      await Room.findOneAndUpdate({ _id: thisRoom._id }, { status: "finish" });
      Broadcast(thisRoom, "Finish", thisRoom.maps[idx].user);
    } else Broadcast(thisRoom, "Shoot", thisRoom);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

const Leave = async (req, res) => {
  console.log(req.body);
  const { roomId } = req.body;
  try {
    const thisRoom = await Room.findOne({ _id: roomId });
    //ROOM NOT FOUND
    if (!thisRoom) {
      res.json({ error: "Room not found" });
      return;
    }
    //GAME NOT LAUNCH
    if (thisRoom.status != "battle") {
      res.json({ error: "Battle not started" });
      return;
    }

    await Room.findOneAndUpdate({ _id: roomId }, { status: "give_up" });
    Broadcast(thisRoom, "Give Up", thisRoom.maps[thisRoom.current_turn].user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};
/***********************************************************************************/
/* Function name : Broadcast                                                       */
/* Description : Emit on sockets of all users in the room                          */
/* Other functions called : getReceiverSocketId (socket.js)                        */
/***********************************************************************************/
const Broadcast = (Room, key, message) => {
  let receiverSocketId;
  Room.users.map((_id, idx) => {
    receiverSocketId = null;
    receiverSocketId = getReceiverSocketId(_id);
    // console.log(receiverSocketId);
    if (receiverSocketId) {
      // console.log(receiverSocketId);
      io.to(receiverSocketId).emit(key, message);
    }
  });
};

module.exports = {
  makeid,
  createRoom,
  joinRoom,
  getRoomById,
  startRoom,
  playerReady,
  PreparationsCompleted,
  Shoot,
  Leave,
};
