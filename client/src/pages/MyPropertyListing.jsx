
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Loader from "../components/Loader.jsx";

const MyPropertyListing = () => {

       const [error,seterror] = useState(false)
           const [userListings,setUserListings] = useState([])
           const [api,setApi] = useState(true)
           const [loading,setLoading] = useState(false)
          

    useEffect(()=>{
            setLoading(false)
            fetch('http://localhost:3000/api/v1/user/userListings',{
                method:'POST',
                credentials:"include",
            }).then(res => res.json())
            .then(res => {setUserListings(res.data) 
                            })
            .catch(err => console.log(err))
            setLoading(true)
        },[api])
    
        const navigate = useNavigate()
        const showDeatils = (propertyId)=>{
         navigate(`/property/details/${propertyId}`)
        }
    


   if(userListings.length==0)return(<div className="text-center text-xl text-red-600 mt-52">No property Listed .......Add Your First</div>)
  return (
    <div className="p-4">
  <div className="overflow-y-auto max-h-[80vh] pr-2">
    <div className="text-3xl text-blue-400 font-semibold text-center mb-6">
      My Listings
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {userListings.map((item) => (
        <div
          key={item._id}
          onClick={() => showDeatils(item._id)}
          className="bg-gray-100 rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg transition duration-300"
        >
          <div className="mb-2">
            <img
              src={item.images[0]}
              alt="listing"
              className="rounded w-full h-[180px] object-cover"
            />
          </div>
          <div>
            <p className="text-xl font-semibold mb-1">{item.title}</p>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p>
              <span className="font-medium">Location:</span> {item.location}
            </p>
            <p>
              <span className="font-medium">Seller:</span> {item.seller.fullname}
            </p>
            <div>
              <span className="font-medium">Price:</span>{" "}
              <span className="text-red-600">${item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default MyPropertyListing
