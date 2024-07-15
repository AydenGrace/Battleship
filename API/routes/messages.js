const {
  getMessages,
  sendMessage,
} = require("../controllers/messages-controller");

const router = require("express").Router();

router.post("/:id", getMessages);
router.post("/send/:id", sendMessage);

module.exports = router;
