const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Fetchuser=require('../middleware/Fetchuser');

const router = express.Router();
const jwt_secretKey = 'DreamersDiary$';

// Route 1: Create a user using: POST '/api/auth/createuser'. Does not require Authentication.
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success,error: 'User already exists' });
    }

    // Generate a salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const SecPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: SecPassword
    });

    // Generate JWT token
    const data = {
      user: {
        id: newUser.id
      }
    };

    const authToken = jwt.sign(data, jwt_secretKey);

    // Send response
    success=true;
    res.json({success,authToken });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Route 2: Login a user using: POST '/api/auth/login'. Do not Require Authentication.
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blank').exists()
], async (req, res) => {
  let success=false;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body; // get the email and password by destrecturing request.body 

  try {
    let exsistinguser= await User.findOne({email}); // find the email if it is there in database first.
    if(!exsistinguser){
      success=false;
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    // if email exsists go for password comparing with stored hashed password.
    const passwordcompare=await bcrypt.compare(password,exsistinguser.password)
    if(!passwordcompare)
      {
        success=false;
        return res.status(400).json({ success,error: 'Invalid email or password' });
      }

    // Generate JWT token
    const data = {
      user: {
        id: exsistinguser.id
      }
    };

    const authToken = jwt.sign(data, jwt_secretKey);
    const success=true;

    // Send response
    res.json({ success,authToken });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Route 3: getuser details using: POST '/api/auth/login'.login required.
router.post('/getuser',Fetchuser,async (req,res)=>{

  try {
    const userID=req.user.id;
    const userinfo=await User.findById(userID).select("-password");

    if (!userinfo) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.send(userinfo);
    
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server error' });
  }

});


module.exports = router;
