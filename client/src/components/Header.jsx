import React from "react";
import { FaHome } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import logo from '/logo.png'
function Header(){

const navigate = useNavigate()
const handleLogout= async ()=>{
    const token = localStorage.getItem("token");
    const response = await fetch('http://localhost:3000/api/v1/user/logout',{
        method:'GET',
        credentials:"include"
    }).then(res => res.json())
    .catch(err => console.log(err))
    console.log(response);
    if(response?.statuscode == 200){
        alert("User loged Out");
        localStorage.removeItem("token");
      localStorage.removeItem("user"); 
        navigate(`/`)
       
    }
}


return(
    <div> 
        <div className="flex justify-between px-20 p-4 shadow-lg bg-blue-400">

            <div className="flex  items-center "><div><img alt="logo" src={logo} className="h-14 rounded-full"/></div> <div className="font-semibold text-3xl text-white ">StayFinder </div></div>
            <div className="flex items-center">
                <ul className="flex gap-2 text-white text-xl ">
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/')}} >Listing</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/property/search')}} >Search</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/property/addNew')}}>MyListings/Add NewProp</div></li>
                     <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/property/myBookings')}} >MyBookings</div></li>
                      <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/property/RecievedBookings')}} >BookingRecieved</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/user/login')}} >Login</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/user/signup')}}>SignUp</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={handleLogout}>Logout</div></li>
                </ul>
            </div>
        </div>
    </div>
)
}

export default Header