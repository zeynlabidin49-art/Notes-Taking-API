require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Note = require("../models/Notes");
const User = require("../models/Users");
const Token = require("../models/Tokens");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json("Please Provide Username or Password");
    const userExist = await User.findOne({ username });
    if (userExist) return res.status(400).json({ msg: "User already exist!" });
    const hash = await bcrypt.hash(password, 10);
    const user = {
      username,
      hashedPassword: hash,
    };
    const newUser = await User.create(user);
    res.status(200).json("success!!");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password, deviceId } = req.body;
    if (!username || !password || !deviceId)
      return res.status(400).json("Please Provide Username, Password or deviceId");
    const isUserExist = await User.findOne({ username });
    if (!isUserExist)
      return res.status(400).json({ msg: "User does not exist!" });
    const id = isUserExist._id
    const hashedPassword = isUserExist.hashedPassword;
    
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      const accessToken = generateToken({ username,id });
      const refreshToken = jwt.sign(
        { username,id },
        process.env.REFRESH_TOKEN_SECRET,
      );
      await Token.deleteMany({userId:id, deviceId: deviceId})
      await Token.create({tokenValue: refreshToken, userId:id, deviceId: deviceId})
      res.status(200).json({ username, accessToken, refreshToken });
    } else {
      res.status(400).json("Wrong Password!");
    }
  } catch (error) {
    console.log(error);
  }
};

const token = async(req, res) => {
  const refreshToken = req.body.token;
  
  if (refreshToken === null) return res.status(401).json("No Token Provided");
  const isExist = await Token.findOne({tokenValue: refreshToken})
  if (!isExist) return res.status(403).json({msg: "refreshToken Note Exist!"})

  try {
    const userDecoder = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const username = userDecoder.username;
    const id = userDecoder.id
    const accessToken = generateToken({ useranme: username, id: id });
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.sendStatus(403);
  }
};

const logout = async(req, res) => {
  const refreshToken = req.body.token;
  const removedToken = await Token.findOneAndDelete({tokenValue: refreshToken})
  if (!removedToken) return res.json({msg: "refreshToken Note Exist!"})
  return res.status(200).json("success!")
};

const generateToken = (userObject) => {
  return jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

module.exports = {
  register,
  login,
  token,
  logout,
};
