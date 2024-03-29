const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser')


const JWT_SECRET= 'thisisthebadboyhulk';
// Route 1: create a user using : POST "api/auth/createuser" not require authorization for now;
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass
    });
    
    const data ={
      user:{
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    res.json({authToken});

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    // res.status(500).json({ error: 'Server error' });
    res.status(500).send("Internal Server Error");
  }
})


// Route 2: Authenticting a user using : Post "/api/auth/login" . No login required
router.post('/login', [

  body('email', "Enter a valid Email").isEmail(),
  body('password','Password cannot be blank').exists()
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password}= req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please enter the correct Credentials"});
    }
    
    const passwordCompare= await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please enter the correct Credentials"});
    }

    const data ={
      user:{
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);
    res.json({authToken});

  } catch (error) {

    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})
//Get logged in user details using : Post "/api/auth/getuser". Login Required
router.post('/getuser',fetchUser, async (req, res) => {
  try {
    userId =req.user.id;
    const user = await User.findById(userId).select("-password"); 
    res.send(user);
  } catch (error) {

    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;