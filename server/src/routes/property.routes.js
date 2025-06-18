import { Router } from "express";
import { getAllProperties, getPropertyDetails, searchPropertyByLocation,searchPropertyByprice } from "../controllers/property.controllers.js";
import {createBooking , getReceivedBookings,getUserBookings}from '../controllers/booking.controllers.js'
import { verifyJWT } from "../middlewars/auth.middlewares.js";
import { propertyAIChat } from "../controllers/chatbot.controllers.js";

const router = Router()

router.route('/propertyList').get(getAllProperties)
router.route('/details').post(getPropertyDetails)
router.route('/search/location').post(searchPropertyByLocation)
router.route('/search/price').post(searchPropertyByprice)

router.route('/Booking').post(verifyJWT,createBooking)
router.route('/myBookings').get(verifyJWT,getUserBookings)
router.route('/bookingRecieved').get(verifyJWT,getReceivedBookings)
router.route('/AIChat').post(propertyAIChat)

export default router
