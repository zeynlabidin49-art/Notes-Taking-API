require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [];
const refreshTokens = []

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json("Please Provide Username or Password");
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username,
    hash,
  };
  users.push(user);
  res.status(200).json("success!!")
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json("Please Provide Username or Password");
  const user = users.find((user) => user.username === username);
  if (!user) return res.status(401).json("User Not Exist")
  const isValid = await bcrypt.compare(password, user.hash);
  if (isValid) {
    const accessToken = generateToken({ username });
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken)
    res.status(200).json({username,accessToken,refreshToken})
  }else{
    res.status(400).json("Wrong Password!")
  }
};

const token = (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken === null) return res.status(401).json("No Token Provided")
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    try {
        const userDecoder = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const username = userDecoder.username
        const accessToken = generateToken({useranme: username})
        res.status(200).json({accessToken: accessToken})
    } catch (error) {
        res.sendStatus(403)
    }
}

const logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token!== req.body.token)
}

const generateToken = (username) => {
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

module.exports = {
    register,
    login,
    token,
    logout
}