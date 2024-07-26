const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Room = require("../models/room.schema");

const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10h" });
};

const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        password: hashPassWord,
      });
      await user.save();
      res.status(200).json({
        message: "Inscription réussie",
      });
    } else {
      res.status(400).json({
        message: "Pseudo déjà existant",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  // console.log(req.body);
  try {
    const loggedUserId = req.body.user._id;

    const UserList = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    res.status(200).json(UserList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // console.log(user);
        const token = createTokenLogin(user._id);
        // console.log("token");

        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ message: "Mauvais pseudo et/ou mot de passe" });
      }
    } else {
      res.status(400).json({ message: "Mauvais pseudo et/ou mot de passe" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserHistory = async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const allRooms = await Room.find(
        { users: { $in: user._id } },
        {
          _id: 1,
          users: 1,
          status: 1,
          current_turn: 1,
          updatedAt: 1,
          createdAt: 1,
          maps: 1,
        }
      )
        .sort({ createdAt: -1 })
        .select("-maps.map -__v")
        .populate("users", "-password -createdAt -updatedAt -__v -ready");
      console.log(allRooms);
      res.json({ history: allRooms });
    } else {
      res.json({ error: "User not found" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  getUserHistory,
};
