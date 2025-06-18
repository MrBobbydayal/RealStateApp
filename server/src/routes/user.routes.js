import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    addPropertylisting,
    removePropertyListing,
    getUserListings,
    getUserProfile
} from '../controllers/user.controllers.js'
import { verifyJWT } from "../middlewars/auth.middlewares.js";
import {upload} from '../middlewars/multer.middlewares.js'


const router = Router()

router.route('/register').post(upload.fields([
    {name:"avatar",
     maxCount:1
    }]),registerUser)
router.route('/login').post(upload.none(),loginUser)
router.route('/profile').get(verifyJWT,getUserProfile)
router.route('/logout').get(verifyJWT,logoutUser)
router.route('/new-property').post(verifyJWT,upload.array("photos",12),addPropertylisting)
router.route('/delete-property').delete(verifyJWT,removePropertyListing)
router.route('/userListings').post(verifyJWT,getUserListings)


export default router