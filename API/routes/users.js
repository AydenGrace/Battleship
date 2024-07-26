const {
  signupUser,
  loginUser,
  getUsers,
  getUserHistory,
} = require("../controllers/user-controller");

const router = require("express").Router();

router.post("/signup", signupUser);

router.post("/signin", loginUser);

router.post("/", getUsers);

router.post("/history", getUserHistory);

module.exports = router;
