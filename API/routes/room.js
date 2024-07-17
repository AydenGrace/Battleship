const {
  createRoom,
  joinRoom,
  makeid,
  startRoom,
  getRoomById,
} = require("../controllers/room-controller");

const router = require("express").Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.post("/get", getRoomById);

module.exports = router;
