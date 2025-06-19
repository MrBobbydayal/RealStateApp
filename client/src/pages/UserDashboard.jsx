import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUserAlt } from 'react-icons/fa';

import {MyBookings} from '../pages/Mybookings.jsx'
import { RecievedBookings} from '../pages/BookingRecieved.jsx'
import MyPropertyListing from '../pages/MyPropertyListing.jsx'

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [getData,setGetData] = useState("");
  // const [getBookings,setGetBookings] = useState(false);
  // const [getRecievedBookings,setGetRecievedBookings] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/profile`, {
      method: "GET",
      credentials: "include", // for cookie-based auth
    })
      .then(res => res.json())
      .then(res => {
        setUserData(res.data);
        setLoading(false);
        console.log("Response", res);
      })
      .catch(err => {
        console.error("Fetch error", err);
        setLoading(false);
        // navigate("/user/login");
      });
  }, []);

  const handleGetListings = (e)=>{
      e.preventDefault();
       setGetData("Listings");
  }

   const handleGetBookings = (e)=>{
      e.preventDefault();
       setGetData("Bookings");
  }

   const handleGetRecievedBookings = (e)=>{
      e.preventDefault();
       setGetData("RecievedBookings");
  }
  
  const handleAddProperty = (e)=>{
      e.preventDefault();
       navigate('/property/addNewProperty')
  }

  console.log("UserData",userData)

   const token = localStorage.getItem("token");

   if(!token) return (<div className='text-center text-2xl text-red-700 mt-56'>pls Login First......</div>)

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row">
        <div className="p-4 lg:w-1/3 w-full bg-slate-300 lg:border-l-2 border-t-2 lg:border-t-0">
          <div className="flex flex-col items-center">
            <div className="p-3">
              <img
                src={userData?.avatar || "https://via.placeholder.com/150"}
                alt="User avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 justify-center">
                <span className="font-medium">{userData?.username}</span>
              </div>
            <div className="p-3 text-lg sm:text-xl flex flex-col gap-3 sm:gap-5 text-center">
              <div className="flex items-center gap-2 justify-center">
                <FaUserAlt />
                <span className="font-medium">{userData?.fullname}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <FaEnvelope />
                <span className="font-medium">{userData?.email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <FaPhoneAlt />
                <span className="font-medium">{userData?.mobile}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <FaMapMarkerAlt />
                <span className="font-medium">{userData?.adress}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <button className="p-2 m-4 text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-600 w-full max-w-xs"
                  onClick={handleGetListings}>
                My Listed Properties
              </button>
              <button className="p-2 m-4 text-white font-semibold bg-green-400 rounded-lg hover:bg-green-600 w-full max-w-xs"
                onClick={handleAddProperty}>
               AddProperty
              </button>
            </div>
            <div className="flex justify-center">
              <button className="p-2 m-4 text-white font-semibold bg-fuchsia-400 rounded-lg hover:bg-fuchsia-600 w-full max-w-xs"
                onClick={handleGetBookings}>
               My Bookings
              </button>
              <button className="p-2 m-4 text-white font-semibold bg-blue-400 rounded-lg hover:bg-blue-600 w-full max-w-xs"
                 onClick={handleGetRecievedBookings}>
                Bookings Recieved
              </button>
            </div>
          </div>
        </div>
       
         <div className="p-4 lg:w-2/3 w-full">
             {getData === "Bookings" ? (
               <MyBookings />
             ) : getData === "Listings" ? (
               <MyPropertyListing/>
             ) : getData === "RecievedBookings" ? (
              <RecievedBookings/>
             ): (
               <div className='flex text-red-500 text-xl justify-center items-center'>Select any button to view</div>
             )}
         </div>
      
      </div>
      <Footer />
    </>
  );
};
