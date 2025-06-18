import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";



function Footer(){
return(
    <div>
        <div className="flex justify-between  bg-black/80 text-white p-6 ">
            <div>
                <p className="text-2xl">StayFinder</p> 
                <p>your perfect parten in finding the perfect Property</p>
            </div>
            <div>
                <p className="text-2xl">Contact Us</p>
                <div className="space-y-2 text-white">
                   <p className="flex items-center gap-2 ">
                     <FaPhoneAlt className="text-blue-500" />:- +91 76172 59243
                   </p>
                   <p className="flex items-center gap-2">
                      <FaEnvelope className="text-red-500" />:- StayFinder@ac.in
                   </p>
                </div>
            </div>

            <div>
                <p className="text-2xl px-2">Quick Links</p>
                 <a href="#" className="p-2 hover:underline">Home</a>
                 <a href="#" className="p-2 hover:underline">Listings</a>
                 <a href="#" className="p-2 hover:underline">About us</a>
            </div>

        </div>
    </div>


    
)
}
export default Footer