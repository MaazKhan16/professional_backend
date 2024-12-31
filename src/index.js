// console.log("This is the production level of development");

import dotenv from 'dotenv'
import connectDB from './db/db.js';
import { app } from './app.js';
import { PORT } from './constants.js';
import { User } from './models/user.model.js';
import { Video } from './models/video.model.js';
dotenv.config({
  path: './.env.sample',
})


app.get('/users', async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }catch(err){
    res.status(400).json({err: "Invalid Credentials"})
  }
}) 

app.get('/videos', async(req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  }catch(err){
    res.status(400).json({err: "Invalid Credentials"})
  }
})


/* app.post('/register', async (req, res) => { 
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User created successfully" });
    res.status(201).json(user)
  }catch(err){
    res.status(400).json({ message: "Failed to create user" });
  }
})  */

connectDB().then(() => {
  app.on("error", (err) => {
    console.error(`Run up with some error: ${err}`)
  })
  app.listen(PORT, () => {
    console.log(`🔥 Server is running on port ${PORT}`)
  })
}).catch((err) => {
  console.log(`❌ MongoDB Connection falied: ${err}`);

})





/*  */