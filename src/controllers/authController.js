import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js"

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user: "User Registered Successfully"});
    user.save();
    // await user.save()
  } catch (errors) {
    res.status(400).json(errors);
  }
};

const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json({video: "Video Registerd Successfullly"});
    video.save();
  } catch (errors) {
    res.status(400).json(errors);
  }
};

export { createUser, createVideo };

/* res.json({
  errors: {
    username: "",
    email: "",
    fullname: "",
    avatar: "",
    covnerImage: "",
    password: "",
  },
}); */
