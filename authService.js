const User = require('./userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = 'secret-jwt-key'

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, secret, {expiresIn: "24h"})
}

const login = async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user) {
      return res.status(400).json({message: `User ${username} was not found`})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({message: 'Incorrect password'})
    }
    const token = generateAccessToken(user._id, user.roles)
    return res.json({token})
  } catch (e) {
    console.log(e)
    res.status(400).json({message: 'Login error'})
  }
}

const registration = async (req, res, next) => {
  try {
    const {username, password} = req.body

    const candidate = await User.findOne({username})
    if (candidate) {
      return res.status(400).json({message: 'User already exists'})
    }

    const hashPassword = bcrypt.hashSync(password, 7)

    const user = await User.create({username, password: hashPassword})
    await user.save()

    return res.json({message: "User has been successfully added"})
  } catch (e) {
    console.log(e)
    res.status(400).json({message: 'Registration error'})
  }

}

module.exports = {
  login,
  registration,
}