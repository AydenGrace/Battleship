const {
  createRoom,
  joinRoom,
  makeid,
  startRoom,
  getRoomById,
  playerReady,
  PreparationsCompleted,
  Shoot,
  Leave,
} = require("../controllers/room-controller");

const router = require("express").Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.post("/get", getRoomById);
router.post("/ready", playerReady);
router.post("/start", startRoom);
router.post("/preparationsCompleted", PreparationsCompleted);
router.post("/shoot", Shoot);
router.post("/leave", Leave);

module.exports = router;
