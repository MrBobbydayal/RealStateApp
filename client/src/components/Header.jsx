import React from "react";
import { FaHome ,FaSignInAlt, FaUserPlus,FaSignOutAlt, FaUserAlt} from "react-icons/fa";
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

     <div className="w-full shadow-lg bg-blue-400">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-4">
       
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          <img alt="logo" src={logo} className="h-14 rounded-full" />
          <div className="font-semibold text-3xl text-white">StayFinder</div>
        </div>

        
        <ul className="flex flex-wrap gap-6 text-white text-2xl justify-center md:justify-end">
          <li>
            <div
              className="p-2 hover:border-b-2 hover:border-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FaHome />
            </div>
          </li>
          <li>
            <div
              className="p-2 hover:border-b-2 hover:border-white cursor-pointer"
              onClick={() => navigate("/user/Dashboard")}
            >
              <FaUserAlt />
            </div>
          </li>
          <li>
            <div
              className="p-2 hover:border-b-2 hover:border-white cursor-pointer"
              onClick={() => navigate("/user/login")}
            >
              <FaSignInAlt />
            </div>
          </li>
          <li>
            <div
              className="p-2 hover:border-b-2 hover:border-white cursor-pointer"
              onClick={() => navigate("/user/signup")}
            >
              <FaUserPlus />
            </div>
          </li>
          <li>
            <div
              className="p-2 hover:border-b-2 hover:border-white cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </div>
          </li>
        </ul>
      </div>
    </div>
)
}

export default Header