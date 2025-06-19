import  {  useState } from "react";
import {useForm}from 'react-hook-form'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
function AddProperty(){
    const navigate=useNavigate();
    const [error,seterror] = useState(false)
    const [userListings,setUserListings] = useState([])
    const {register,handleSubmit,reset} = useForm()
    const [api,setApi] = useState(true)
    const [loading,setLoading] = useState(false)
    const [wait,setWait] = useState(false)



   

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

        const res = await fetch('https://realstateapp-gcof.onrender.com/api/v1/user/new-property',{
            method:'POST',
            body:formData,
            credentials:'include'
        }).then(res => res.json())
        .catch(err => console.log(err))
        // console.log(res);
        if(res?.statuscode == 200){
              seterror(false)
              navigate("/user/Dashboard")
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
 <div className="max-w-xl mx-auto mt-10 p-6 bg-slate-400 shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">➕ Add Property</h2>
<form
  onSubmit={handleSubmit(AddProp)}
  className="bg-slate-300 rounded-xl p-6 shadow-lg max-w-3xl mx-auto w-full"
>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
    {[
      { label: "Title", name: "title" },
      { label: "Description", name: "description" },
      { label: "Location", name: "location" },
      { label: "Price", name: "price" },
      { label: "Bedrooms", name: "bedrooms" },
      { label: "Bathrooms", name: "bathrooms" },
      { label: "Property Type", name: "propertyType" }
    ].map(({ label, name }) => (
      <div key={name} className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">{label}:</label>
        <input
          type="text"
          {...register(name)}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    ))}
  </div>

  <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
    <label className="text-gray-700 font-medium sm:w-1/3">Add Image:</label>
    <input
      type="file"
      accept="image/*"
      {...register("photos")}
      className="p-2 rounded border border-gray-300 sm:flex-1"
    />
  </div>

  {error && (
    <div className="text-center text-red-500 mb-4">
      Error: Property with same title exists!
    </div>
  )}

  <div className="flex justify-center">
    <button
      type="submit"
      className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition duration-200"
    >
      Submit
    </button>
  </div>
</form>
</div>
  <Footer/>
 </>   )
}

export default AddProperty