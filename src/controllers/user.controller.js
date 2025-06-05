import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req,res)=>{
    console.log("registerUser called");
    // get user details from frontend
    // validation - not empty
    // check if user already exists username or email
    // check for images
    // check for avatar
    // upload to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response 
    // check for user creation
    // return response

    //1
    const {fullName, username,email,password} = req.body;
    console.log("email: ", email);

    //2
    const requiredFields = [fullName, email, username, password];
    const anyEmpty = requiredFields.some(field => !field || field.trim() === "");

    if (anyEmpty) {
        throw new ApiError(400, "All fields are required");
    } 

    //3
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "Username or Email already exists");
    }

    //4

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0].path;

    //5

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    //6

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar upload failed");
    }

    //7

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //check if user created

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )











})

export {registerUser} ;
