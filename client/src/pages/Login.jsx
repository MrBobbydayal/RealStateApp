import React, { useState } from "react";
import homeImage from '../assets/home.svg'
import deal from '../assets/deal.svg'
import { FaHome } from "react-icons/fa";
import {useNavigate,useLocation} from 'react-router-dom'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
const Login = function(){

    const location = useLocation();


    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    const[error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("Something went wrong")
    const [message,setmessage] = useState(false)


    const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);

    try {
        const response = await fetch(`http://localhost:3000/api/v1/user/login`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const data = await response.json(); 
        console.log("Login response result:", data);

        setEmail("");
        setPassword("");
        setUserName("");

        if (response.status === 200) {
            setmessage(false);
            setError(false);


            if (data.data?.user) {

            localStorage.setItem("user", JSON.stringify(data.data.user)); 
            console.log("Saving user:",JSON.stringify(data.data.user) );

            }
            
            
            if (data.data?.token) {
                
                localStorage.setItem("token", data.data.token);
                console.log("Saving token:", data.data.token);
                
            }

            const redirectPath = location.state?.from || "/user/Dashboard";
            navigate(redirectPath, { replace: true });
        } else if (response.status === 402) {
            setError(true);
            setErrorMessage("Incorrect Password");
            setmessage(true);
        } else if(response.status === 401) {
            setError(true);
            setErrorMessage("User does not exist");
        }

    } catch (err) {
        console.error("Login error:", err);
        setError(true);
        setErrorMessage("Something went wrong");
    }
};


    const  handleSignup = ()=>{
        navigate('/user/signup')
       }

 return(
    <>
<Header />
<div className="min-h-screen bg-slate-300 flex items-center justify-center py-6 px-4">
  <form className="bg-white w-full max-w-md mx-auto p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">🔐 Login</h2>

   
    <div className="flex items-center border rounded-md mb-4 px-3 py-2 shadow-sm">
      <FaUser className="text-gray-500 mr-3" />
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
        className="w-full outline-none"
      />
    </div>

    
    <div className="flex items-center border rounded-md mb-4 px-3 py-2 shadow-sm">
      <FaEnvelope className="text-gray-500 mr-3" />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full outline-none"
      />
    </div>

   
    <div className="flex items-center border rounded-md mb-4 px-3 py-2 shadow-sm">
      <FaLock className="text-gray-500 mr-3" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full outline-none"
      />
    </div>

   
    {error && (
      <div className="text-center text-red-600 mb-4">{errorMessage}</div>
    )}

 
    <div className="text-center text-gray-700 mb-4">
      Don't have an account?
      <button
        type="button"
        onClick={handleSignup}
        className="ml-2 text-blue-500 hover:underline"
      >
        Signup
      </button>
    </div>

  
    <button
      type="button"
      onClick={handleSubmit}
      className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
    >
      Login
    </button>
  </form>
</div>

<Footer />

</> )
}

export default Login