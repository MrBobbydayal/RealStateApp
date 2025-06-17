import jwt from 'jsonwebtoken'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'



const verifyJWT = asyncHandler(async (req,res,next)=>{
    const token = req.cookies?.accessToken
    if(!token) throw new ApiError (403,"UnAuthorized Access")
    const decodedToken = jwt.decode(token)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user) throw new ApiError(400,"Invalid Access Token")
    req.user = user;
    next()
})

export {verifyJWT}


// import jwt from 'jsonwebtoken'
// import { asyncHandler } from '../utils/asyncHandler.js'
// import { ApiError } from '../utils/ApiError.js'
// import { User } from '../models/user.models.js'

// const verifyJWT = asyncHandler(async (req, res, next) => {
//   const token = req.cookies?.accessToken;

//   if (!token) throw new ApiError(403, "Unauthorized Access");

//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.JWT_SECRET); // ✅ proper verification
//   } catch (err) {
//     throw new ApiError(401, "Invalid or expired access token");
//   }

//   const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
//   if (!user) throw new ApiError(400, "User not found");

//   req.user = user;
//   next();
// });

// export { verifyJWT };
