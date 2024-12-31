import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log(req.body);

  const fields = { fullname, email, username, password };
  for (let field in fields) {
    if (!fields[field].trim()) {
      throw new ApiError(400, `${field} is required`);
    } 
  }
    // console.log(fields);
    

  /* if(fullname === ''){
    throw new ApiError(400, "fullname is required")
  } */

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (existedUser) {
    throw new ApiError(409, "username or email already exists");
  }

  // req.files.avatar[0].path
  const avatarLocalPath = req?.files?.avatar[0]?.path;
  const coverImageLocalPath = req?.files?.coverImage[0]?.path;

  console.log("avatar", avatarLocalPath);
  console.log("cover imahe", coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is requied");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar field is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    " -password -refreshToken "
  );

  if(!createdUser){
    throw new ApiError(500 , "something went wrong while registering the user")
  }

    
  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Created Succesfully")
  );
  /* res.status(201).json({
    message: "ok",
  }); */
});

const loginUser = asyncHandler(async (req, res) => {
  // req body => data
  // check username or email
  // check wether password is there or not
  // find the user
  // password check
  // access token and refresh token
  // send cookies
  // validation

  const { username, email, password } = req.body;
  console.log(req.body);

  if(!username || !email){
    throw new ApiError(400, "username or email is required")
  }

})

export { registerUser, loginUser };
