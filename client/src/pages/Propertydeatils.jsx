import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt ,FaPhoneAlt, FaEnvelope,FaUserAlt} from 'react-icons/fa';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import AIChatModal from '../pages/propertyChat.jsx'

const PropertyDetails = function(){
  const [showBot, setShowBot] = useState(false);
    const navigate=useNavigate();
    const [loading , setLoading] = useState(true)
    const [propertyData,setpropertyData] = useState({})
    const {id} = useParams()
    useEffect(()=>{

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/property/details`,{
            method:'POST',
            credentials:"include",
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

const handleBooking = () => {
  const bookingInfo = {
    _id: propertyData._id,
    title: propertyData.title,
    location: propertyData.location,
    price: propertyData.price,
    seller: {
      name: propertyData.seller?.fullname,
      phone: propertyData.seller?.mobile
    }
  };

  localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));

  navigate("/property/booking", {
    state: {
      property: bookingInfo
    }
  });
};



     if(loading) return(
      <div>
       <Loader/>
      </div>
    )

    return (
        <>
        <Header/>
<div class="flex flex-col lg:flex-row">
  <div class="p-4 lg:w-2/3 w-full">
    <div>
      <img src={propertyData.images} alt="property" class="w-full h-auto" />
    </div>
    <div class="py-4">
      <p class="p-4 text-2xl sm:text-3xl font-bold">
        {propertyData.title}
      </p>
      <p class="px-4 text-sm sm:text-md flex items-center gap-1">
        <FaMapMarkerAlt /> {propertyData.location}
      </p>
      <p class="p-4 text-base sm:text-lg">{propertyData.description}</p>
    </div>
    <div>
      <p class="px-4">
        <span class="font-medium">PropertyType :-</span> {propertyData.propertyType}
      </p>
      <p class="px-4">
        <span class="font-medium">Bedrooms :-</span> {propertyData.bedrooms}
      </p>
      <p class="px-4">
        <span class="font-medium">Bathrooms :-</span> {propertyData.bathrooms}
      </p>
      <p class="px-4">
        <span class="font-medium">Price :-</span>
        <span class="text-red-700"> ${propertyData.price}</span>
      </p>
    </div>
  </div>
  <div class="p-4 lg:w-1/3 w-full lg:mt-8 lg:border-l-2 border-t-2 lg:border-t-0">
    <div class="text-2xl p-3 text-center my-8">Seller details</div>
    <div class="flex flex-col items-center">
      <div class="p-3">
        <img src={propertyData.seller.avatar} alt="seller avatar" class="w-24 h-24 rounded-full object-cover" />
      </div>
      <div class="p-3 text-lg sm:text-xl flex flex-col gap-3 sm:gap-5 text-center">
        <div class="flex items-center gap-2">
          <FaUserAlt />
          <span class="font-medium">:-</span> {propertyData.seller.fullname}
        </div>
        <div class="flex items-center gap-2">
          <FaEnvelope />
          <span class="font-medium">:-</span> {propertyData.seller.email}
        </div>
        <div class="flex items-center gap-2">
          <FaPhoneAlt />
          <span class="font-medium">:-</span> {propertyData.seller.mobile}
        </div>
        <div class="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span class="font-medium">:-</span> {propertyData.seller.adress}
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-center">
        <button
          class="p-2 m-4 text-white font-semibold bg-blue-400 rounded-lg hover:bg-blue-600 w-full max-w-xs"
          onClick={() => setShowBot(true)}
        >
          Inquire About This property
        </button>
      </div>
      <div class="flex justify-center">
        <button
          class="p-2 m-4 text-white font-semibold bg-green-400 rounded-lg hover:bg-green-600 w-full max-w-xs"
          onClick={handleBooking}
        >
          Book/Rent
        </button>
      </div>
    </div>
    {showBot && <AIChatModal property={propertyData} onClose={() => setShowBot(false)} />}
  </div>
</div>
        <Footer/>
   </> )
}

export default PropertyDetails