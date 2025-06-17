import React, { useEffect, useState } from "react";
import {useForm}from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
function AddProperty(){

    const [error,seterror] = useState(false)
    const [userListings,setUserListings] = useState([])
    const {register,handleSubmit,reset} = useForm()
    const [api,setApi] = useState(true)
    const [loading,setLoading] = useState(false)
    const [wait,setWait] = useState(false)

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


   

    const AddProp = async function(data){
        setWait(true)
        // console.log(data);
        const formData = new FormData()
        formData.append("title",data.title)
        formData.append("description",data.description)
        formData.append("location",data.location)
        formData.append("price",data.price)
        formData.append("bedrooms",data.bedrooms)
        formData.append("bathrooms",data.bathrooms)
        formData.append("photos",data.photos[0])
        formData.append("propertyType",data.propertyType)

        const res = await fetch('http://localhost:3000/api/v1/user/new-property',{
            method:'POST',
            body:formData,
            credentials:'include'
        }).then(res => res.json())
        .catch(err => console.log(err))
        // console.log(res);
        if(res?.statuscode == 200){
              seterror(false)
        }
        else{
            seterror(true)
        }
        reset()
        setApi((prev)=>!prev)
        setWait(false)
    }

    
    if(wait) return <div>Wait......</div>


    return(
      <>
      <Header/>
       <div className="flex gap-4 p-6 h-[90vh] overflow-hidden">
  {/* LEFT: My Listings (scrollable) */}
  <div className="w-1/2 overflow-y-scroll pr-2">
    <div className="text-3xl text-blue-400 font-semibold text-center mb-6">My Listings</div>
    <div className="grid grid-cols-1 gap-6">
      {userListings.map((item) => (
        <div key={item._id} onClick={() => showDeatils(item._id)} className="bg-gray-100 rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg transition">
          <div className="mb-2">
            <img src={item.images[0]} alt="" className="rounded w-full h-[180px] object-cover" />
          </div>
          <div>
            <p className="text-xl font-semibold mb-1">{item.title}</p>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p><span className="font-medium">Location:-</span> {item.location}</p>
            <p><span className="font-medium">Seller:-</span> {item.seller.fullname}</p>
            <div> 
                  <span className="font-medium">Price:-</span>
                  <span className="text-red-600">${item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* RIGHT: Add Property Form (also scrollable if needed) */}
  <div className="w-1/2 overflow-y-scroll pl-2">
    <div className="text-3xl text-blue-400 font-semibold text-center mb-4">Add A New Property</div>
    <form onSubmit={handleSubmit(AddProp)} className="bg-slate-300 rounded-lg p-6 shadow-md">
      <div className="text-2xl text-center mb-6">Add Property</div>

      {/* Form Fields */}
      {[
        { label: "Title", name: "title" },
        { label: "Description", name: "description" },
        { label: "Location", name: "location" },
        { label: "Price", name: "price" },
        { label: "Bedrooms", name: "bedrooms" },
        { label: "Bathrooms", name: "bathrooms" },
        { label: "Property Type", name: "propertyType" }
      ].map(({ label, name }) => (
        <div className="mb-4 grid grid-cols-2 items-center" key={name}>
          <label className="text-lg">{label}:</label>
          <input type="text" className="p-2 rounded-lg" {...register(name)} />
        </div>
      ))}

      <div className="mb-4 grid grid-cols-2 items-center">
        <label className="text-lg">Add Image:</label>
        <input type="file" className="p-2 rounded-lg" accept="image/*" {...register("photos")} />
      </div>

      {error && <div className="text-center text-red-500 mb-4">Error: Property with same title exists!</div>}

      <div className="flex justify-center">
        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
<Footer/>
 </>   )
}

export default AddProperty