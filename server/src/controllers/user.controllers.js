import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import {Property} from '../models/property.models.js'




const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, mobile, adress, password } = req.body;

  
  if (!fullname || !username || !password || !email || !mobile || !adress) {
    throw new ApiError(400, "All fields are required.");
  }

  
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this username.");
  }

 
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar file is required.");
  }

  const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
  if (!avatarUpload) {
    throw new ApiError(500, "Failed to upload avatar to Cloudinary.");
  }

  
  let user;
  try {
    user = await User.create({
      fullname,
      username,
      email,
      mobile,
      adress,
      password,
      avatar: avatarUpload,
      role: "user", // Hardcoded role
    });
  } catch (err) {
    console.error("Mongoose Validation Error:", err.errors || err);
    throw new ApiError(500, "User creation failed. Please check field types.");
  }

  
  const createdUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully."));
});


const generateAccessAndRefreshTokens = async(userid)=>{
    try {
        const user = await User.findById(userid)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefershToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,error?.message || "something went wrong while generating Accesss and refreshToken")
    }
}

const loginUser = asyncHandler(async(req,res)=>{
    const {username , email , password } = req.body
    
    if(!username || !password || !email) throw new ApiError(401,"All feilds are required")
    
    const user = await User.findOne({username})
    if(!user) throw new ApiError(401,"user does not exixits")

    const isPasswordVaild = await  user.isPasswordValid(password)
    if(!isPasswordVaild) throw new ApiError(402,"incorrect Password")
    
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true,
        sameSite: "None"
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200, { user: loggedInUser, token: accessToken },"user Successfully loggedin")
    )

})



const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User ID not found.");
  }

  const user = await User.findById(userId).select("-password");
  
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully."));
});


const logoutUser = asyncHandler(async(req,res)=>{
    const userid = req.user?._id
    if(!userid) throw new ApiError(401,"unauthorizrd Access")
    const user = await User.findByIdAndUpdate(
        userid,
        {
            $unset:{
                refreshToken:1
            }
        }
       ,{
        new:true
        }
    ).select("-password -refreshToken")

    return res.status(200)
  .clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  })
  .clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  })

    .json(
        new ApiResponse(
            200,user,"User Logged out SuccessFully"
        )
    )

})

const addPropertylisting = asyncHandler(async(req,res)=>{
    
    
    const {title, location ,propertyType,price,bedrooms,bathrooms,description} = req.body
   
    if(!title || !location || !propertyType || !price ) throw new ApiError(401,"All feilds required")
    // console.log(req.files)
    const exixtingProperty = await Property.findOne({title})
    if(exixtingProperty) throw new ApiError (400,"this propety Already exixits")
    let images=[]
    if(req.files){
        for(const file of req.files){
            // console.log("inside files loop");
            const path = file?.path
            // console.log("paths is ",path);
            const res = await uploadOnCloudinary(path)
            // console.log(res);
            images.push(res)
        }
    }

    const property = await Property.create({
        title,
        location,
        propertyType,
        price,
        bedrooms,
        bathrooms,
        images,
        description,
        seller:req.user
    })

    return res.status(200)
    .json(
       new ApiResponse(
        200,
        property,
        "Property Uploaded Successfully"
       )
    )
})

const removePropertyListing = asyncHandler (async(req,res)=>{
    const {id} = req.query
    if(!id) throw new ApiError(401,"invalid property id")
    const response =  await Property.findByIdAndDelete(id);

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            response,
            "successfully deleted"
        )
    )
})

const getUserListings = asyncHandler(async(req,res)=>{
    const data = await Property.find({seller:req.user?._id})
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            data,
            "userListings fetched successfully"
        )
    )
})




export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    addPropertylisting,
    removePropertyListing,
    getUserListings
}

