import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function SearchResult(){
    const [searchFeildValue,setSearchFeildValue] = useState("")
    const [searchData,setSearchData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("something went wrong")

    const {location} = useParams()
    
    useEffect(  ()=>{
        setLoading(true)
        setSearchFeildValue(location)
        fetch(`http://localhost:3000/api/v1/property/search/location`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({"location":location})
        }).then(res => res.json())
        .then(res => {setSearchData(res.data)
            if(res.data?.length ==0){
                setError(true)
                setErrorMessage("No data found !!")
            }
            else setError(false)
        })
        setLoading(false)
    },[])

    const getData = function(){
        setLoading(true)
        if(!searchFeildValue) console.log("no seach feild");
        else{
        fetch(`https://realstateapp-gcof.onrender.com/api/v1/property/search/location`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({"location":searchFeildValue})
        }).then(res => res.json())
        .then(res => {setSearchData(res.data)
       
        if(res.data?.length ==0){
            setError(true)
            setErrorMessage("No data found !!!")
        }
        else setError(false)
    }
    )
    }
        setSearchFeildValue("")
        setLoading(false)
    }
    const navigate = useNavigate()
    const showDeatils = (propertyId)=>{
    navigate(`/property/details/${propertyId}`)
    }

    if(loading) return <div><Loader/></div>

    return (<>
       <Header />
<div className="px-4">
 
  <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-12">
    <input
      type="text"
      value={searchFeildValue}
      placeholder="Location"
      onChange={(e) => setSearchFeildValue(e.target.value)}
      className="border-2 w-full max-w-xs p-2 rounded-lg"
    />
    <button
      onClick={getData}
      className="p-2 w-full max-w-[10rem] text-white text-lg rounded bg-blue-400 hover:bg-blue-500 transition"
    >
      Search
    </button>
  </div>

  
  {error && (
    <div className="text-xl text-center text-red-500 mb-6">
      {errorMessage}
    </div>
  )}

  
  <div className="flex justify-center px-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 w-full max-w-7xl">
      {searchData.map((item) => (
        <div
          key={item._id}
          onClick={() => showDeatils(item._id)}
          className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
        >
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="p-4">
            <p className="text-xl font-semibold mb-2">{item.title}</p>
            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
            <div className="text-sm text-gray-800 mb-1">
              <span className="font-medium">📍 Location:</span>{" "}
              <span className="text-blue-600">{item.location}</span>
            </div>
            <div className="text-sm text-gray-800 mb-1">
              <span className="font-medium">👤 Seller:</span> {item.seller.fullname}
            </div>
            <div className="text-sm text-gray-800">
              <span className="font-medium">💰 Price:</span>{" "}
              <span className="text-red-600">${item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
<Footer />
</>
    )
}

export default SearchResult