
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Property } from '../models/property.models.js';
import { Booking } from '../models/booking.models.js';

const createBooking = asyncHandler(async (req, res) => {
  const { propertyId, startDate, endDate } = req.body;

  if (!propertyId || !startDate || !endDate) {
    throw new ApiError(401, "All fields are required");
  }

  const property = await Property.findById(propertyId).populate("seller", "_id");
  if (!property) throw new ApiError(404, "Property not found");

  
  const conflictingBooking = await Booking.findOne({
    propertyId: propertyId,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ]
  });

  if (conflictingBooking) {
    throw new ApiError(400, "Property is already booked for the selected dates.");
  }

  const newBooking = await Booking.create({
    propertyId: property._id,
    buyerId: req.user._id, // From JWT middleware
    sellerId: property.seller._id,
    startDate,
    endDate
  });

  res.status(201).json({
    success: true,
    message: "Booking successful",
    booking: newBooking
  });
});




const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ buyerId: req.user._id })
    .populate('propertyId', 'title location image price')
    .populate('sellerId', 'name phone');

  res.status(200).json({
    success: true,
    bookings
  });
});



const getReceivedBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ sellerId: req.user._id })
    .populate('propertyId', 'title location')
    .populate('buyerId', 'fullname mobile');

  res.status(200).json({
    success: true,
    bookings
  });
});



export {createBooking, getReceivedBookings,getUserBookings}
