import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Loader from '../components/Loader.jsx'
import {FaMapMarkerAlt,FaHome} from 'react-icons/fa'

function Home(){
       const navigate = useNavigate()
      const [PropertyDetails , setPropertyDetails] = useState([])
      const [loading,setLoading] = useState(true)

      useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/propertylist`)
        .then(res => res.json())
        .then(res => {
          setPropertyDetails(res.data) 
          setLoading(false)
        })
      },[])

         //console.log("port:-",import.meta.env.VITE_API_URL)

      const showDeatils = (propertyId) => {
           const token = localStorage.getItem("token");
           const targetPath = `/property/details/${propertyId}`;

           if (!token) {
   
                 navigate("/user/login", {
                state: { from: targetPath }
                     });
            } else {

                 navigate(targetPath);
                         }
                                      };



   const [locationFeild,setLoactionFeild] = useState("")
                                          
   
     const search = ()=>{
        if(locationFeild){
        const location = locationFeild
        setLoactionFeild("")
        navigate(`/property/search/${location}`)
        }
    }

    if(loading) return(
      
       <Loader/>
     
    )

    return (<>
         <Header/>
        
         <div className="bg-gray-200 py-12 px-4">

  <div className="text-center mb-8">
    <p className="text-black text-3xl sm:text-4xl lg:text-5xl font-semibold">
      Let's Guide You Home
    </p>
  </div>

 
  <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
   
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label className="text-black text-lg sm:text-xl font-medium"><FaHome/> Property Type</label>
      <select className="p-2 w-60 rounded-md">
        <option value="Housing">Housing</option>
        <option value="Commercial">Commercial</option>
        <option value="Apartments">Apartments</option>
      </select>
    </div>

   
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label className="text-black text-lg sm:text-xl font-medium"><FaMapMarkerAlt/>Location</label>
      <input
        value={locationFeild}
        onChange={(e) => setLoactionFeild(e.target.value)}
        type="text"
        className="p-2 w-60 rounded-md"
        placeholder="City"
      />
    </div>

  
    <button
      onClick={search}
      className="bg-blue-400 hover:bg-blue-500 text-white text-lg font-medium px-6 py-2 rounded transition"
    >
      🔍 Search
    </button>
  </div>
</div>



        <div className="flex justify-center bg-gray-200 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PropertyDetails.map((item) => (
          <div
            key={item._id}
            onClick={() => showDeatils(item._id)}
            className="w-full max-w-xs bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition duration-200"
          >
            <div className="mb-4 h-48 overflow-hidden rounded-t-xl">
              <img
                src={item.images[0]}
                loading="lazy"
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-xl font-semibold mb-2 ">{item.title}</p>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Location: </span>
                <span>{item.location}</span>
              </div>
              <div className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Price: </span>
                <span className="text-red-600">${item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        <Footer/>
        </>
    )
}

export default Home

