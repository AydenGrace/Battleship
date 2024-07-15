const {
  signupUser,
  loginUser,
  getUsers,
} = require("../controllers/user-controller");

const router = require("express").Router();

router.post("/signup", signupUser);

router.post("/signin", loginUser);

router.post("/", getUsers);

module.exports = router;
