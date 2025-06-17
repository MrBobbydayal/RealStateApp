import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Loader from '../components/Loader.jsx'

function Home(){

      const [PropertyDetails , setPropertyDetails] = useState([])
      const [loading,setLoading] = useState(true)

      useEffect(()=>{
        fetch("http://localhost:3000/api/v1/property/propertylist")
        .then(res => res.json())
        .then(res => {
          setPropertyDetails(res.data) 
          setLoading(false)
        })
      },[])

      const navigate = useNavigate()

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


    if(loading) return(
      <div>
       <Loader/>
      </div>
    )

    return (<>
         <Header/>
        <div className="flex justify-center bg-gray-200  p-4 ">
            <div className=" grid grid-cols-4 gap-x-6 gap-y-6">
            {PropertyDetails.map((item)=>(
              <div key={item._id} onClick={()=>{showDeatils(item._id)}} className="w-[300px]  bg-white rounded-xl ">
                <div className="mb-4 "><img src={item.images[0]} loading="lazy" alt="" /></div>
                <div className="p-3">
                <p className="text-2xl mb-4">{item.title}</p>
                {/* <p className="mb-8">{item.description}</p> */}
                 <div>
                <span className="font-medium">Location:-</span>
                <span>{item.location}</span>
                </div>

            {/*}<div>
                <span className="pr-2">Seller:</span>
                <span>{item.seller.fullname}</span>
                </div>*/}
                <div> 
                  <span className="font-medium">Price:-</span>
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

