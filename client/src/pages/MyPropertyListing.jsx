
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Loader from "../components/Loader.jsx";

const MyPropertyListing = () => {

       const [error,seterror] = useState(false)
           const [userListings,setUserListings] = useState([])
           const [api,setApi] = useState(true)
           const [loading,setLoading] = useState(true)
          

    useEffect(()=>{
            setLoading(false)
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/userListings`,{
                method:'POST',
                credentials:"include",
            }).then(res => res.json())
            .then(res => {setUserListings(res.data) 
                            })
            .catch(err => console.log(err))
            setLoading(false)
        },[api])
    
        const navigate = useNavigate()
        const showDeatils = (propertyId)=>{
         navigate(`/property/details/${propertyId}`)
        }
    

const handleDelete = async (propertyId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this property?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/user/delete-property?id=${propertyId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to delete");
    }

    alert("Deleted Successfully");
    setApi((prev) => !prev); // re-fetch the listings
  } catch (error) {
    console.error("Delete error:", error);
    alert(error.message || "Something went wrong");
  }
};

 if (loading) return <div className="p-6"><Loader/></div>;




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
  className="bg-gray-100 rounded-xl shadow-md p-3 hover:shadow-lg transition duration-300 relative"
>
  {/* DELETE BUTTON */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevents triggering the card click
      handleDelete(item._id);
    }}
    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
    title="Delete Property"
  >
    &times;
  </button>

  <div onClick={() => showDeatils(item._id)}>
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
</div>



        // <div
        //   key={item._id}
        //   onClick={() => showDeatils(item._id)}
        //   className="bg-gray-100 rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg transition duration-300"
        // >
        //   <div className="mb-2">
        //     <img
        //       src={item.images[0]}
        //       alt="listing"
        //       className="rounded w-full h-[180px] object-cover"
        //     />
        //   </div>
        //   <div>
        //     <p className="text-xl font-semibold mb-1">{item.title}</p>
        //     <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        //     <p>
        //       <span className="font-medium">Location:</span> {item.location}
        //     </p>
        //     <p>
        //       <span className="font-medium">Seller:</span> {item.seller.fullname}
        //     </p>
        //     <div>
        //       <span className="font-medium">Price:</span>{" "}
        //       <span className="text-red-600">${item.price}</span>
        //     </div>
        //   </div>
        // </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default MyPropertyListing
