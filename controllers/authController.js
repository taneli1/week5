'use strict';


const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel');
const { validationResult} = require('express-validator');


const login = (req, res) => {

  console.log(req.body.username)

  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('login', info)
    delete user.password

    if (err || !user) {
      return res.status(400).json({
        message: `authController: Something is not right ${user}`,
        user: user,
      });
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response

      const token = jwt.sign(user, 'testing');
      return res.json({user, token});
    });
  })
  (req, res);
};

const user_create_post = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    if (await userModel.insertUser(req)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_create_post,
  logout
};