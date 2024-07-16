const {
  createRoom,
  joinRoom,
  makeid,
  startRoom,
} = require("../controllers/room-controller");

const router = require("express").Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);

module.exports = router;
