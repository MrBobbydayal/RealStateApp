import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import seller from '../assets/seller.png'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";

const PropertyDetails = function(){
    const [loading , setLoading] = useState(true)
    const [propertyData,setpropertyData] = useState({})
    const {id} = useParams()
    useEffect(()=>{

        fetch('http://localhost:3000/api/v1/property/details',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "id":id
            })
        }).then(res => res.json())
        .then(res => {
            setpropertyData(res.data)
            setLoading(false)
        }).catch(err => console.log(err))
    },[])

    // console.log(propertyData.seller.fullname);

     if(loading) return(
      <div>
       <Loader/>
      </div>
    )

    return (
        <>
        <Header/>
        <div className="flex ">
            <div className="p-4 w-2/3">
                <div className="">
                <img src={propertyData.images} alt="property" />
                </div>
                <div className="py-4">
                    <p className="p-4 text-3xl ">{propertyData.title}</p>
                    <p className="px-4 text-md ">📌 :-{propertyData.location}</p>
                    <p className="p-4 text-lg">{propertyData.description}</p>
                </div>
                <div>
                    <p className="px-4"><span className="font-medium">PropertyType :-</span> {propertyData.propertyType}</p>
                    <p className="px-4"><span className="font-medium">bedrooms :-</span> {propertyData.bedrooms}</p>
                    <p className="px-4"><span className="font-medium">bathrooms :-</span> {propertyData.bathrooms}</p>
                    <p className="px-4"><span className="font-medium">Price :-</span><span className="text-red-700"> ${propertyData.price}</span></p>
                </div>
            </div>
            <div className="p-4 w-1/3 mt-8 border-l-2 ">
                    <div className="text-2xl p-3 text-center my-8">Seller details</div>
                    <div className="flex">
                        <div className="p-3 "><img src={propertyData.seller.avatar} alt="seller avatar" /></div>
                        <div className="p-3 text-xl flex flex-col gap-5">
                            <div><span className="font-medium">Seller Name  :-</span> {propertyData.seller.fullname}</div>
                            <div><span className="font-medium">Email :-</span> {propertyData.seller.email}</div>
                            <div><span className="font-medium">Mobile :-</span> {propertyData.seller.mobile}</div>
                            <div><span className="font-medium">Address :-</span>{propertyData.seller.adress}</div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center"><button className="p-2 m-4 text-white font-semibold bg-blue-400 rounded-lg hover:bg-blue-600 w-80 ">Inquire About This property</button></div>
                        <div className="flex justify-center"><button className="p-2 m-4 text-white font-semibold bg-green-400 rounded-lg hover:bg-green-600 w-80 ">Book/Rent</button></div>
                    </div>
            </div>
        </div>
        <Footer/>
   </> )
}

export default PropertyDetails