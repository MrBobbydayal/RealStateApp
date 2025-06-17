import React, { useState } from "react";
import homeImage from '../assets/home.svg'
import deal from '../assets/deal.svg'
import { FaHome } from "react-icons/fa";
import {useNavigate,useLocation} from 'react-router-dom'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const Login = function(){

    const location = useLocation();


    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    const[error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("Something went wrong")
    const [message,setmessage] = useState(false)

    // const handleSubmit = async (e)=>{
    //     e.preventDefault()
    //     const formData = new FormData()
    //     formData.append("username",userName)
    //     formData.append("email",email)
    //     formData.append("password",password)

    //     const response = await fetch(`http://localhost:3000/api/v1/user/login`,{
    //         method:'POST',
    //         credentials:'include',
    //         body:formData
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })

    //     setEmail("")
    //     setPassword("")
    //     setUserName("")
    //     // console.log(response);
       
    //     if (response && response.status === 200) {
    //         setmessage(false);
    //         setError(false);

    //         if (response.token) {
    //             localStorage.setItem("token", response.token);
    //         }

    //            console.log("Login response result:", response);
    //            console.log("Saving token:", response.data.token);

    //         const redirectPath = location.state?.from || "/property/search";
    //        navigate(redirectPath, { replace: true });
    //        }
    //    else if(response.status == 402){
    //         setError(true)
    //         setErrorMessage("Incorrect Password")
    //         setmessage(true)
    //     }
    //     else{
    //         setError(true)
    //         setErrorMessage("user does not exists")
    //     }
    // }


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

            const redirectPath = location.state?.from || "/property/search";
            navigate(redirectPath, { replace: true });
        } else if (response.status === 402) {
            setError(true);
            setErrorMessage("Incorrect Password");
            setmessage(true);
        } else {
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
    <Header/>
    <div>
    <div className="flex bg-blue-100 ">

        <div className="w-1/2 h-screen flex flex-col justify-center">
            <p className="text-4xl text-center my-6">Find your dream property With us</p>
            <p className="text-xl text-center my-4">Discover What Sets Us Apart</p>
            
            <div className=" flex justify-center">
                {/* <form action="" className="">
                    <div className="flex justify-around">
                    <label htmlFor="">username: </label>
                    <input type="text" />
                    </div>
                    <div className="flex justify-around">
                    <label htmlFor="">email: </label>
                    <input type="text" />
                    </div>
                    <div className="flex justify-around">
                    <label htmlFor="">password: </label>
                    <input type="text" />
                    </div>
                </form> */}
                
                <form action="" className=" bg-gray-100 w-[400px] p-4 rounded-xl shadow-md   ">
                <div className="text-center text-xl mb-4">Login</div>
                    <div className="grid grid-cols-2">
                        <div className="text-center">
                            <p className="m-2 p-2">username: </p>
                            <p className="m-2 p-2">email: </p>
                            <p className="m-2 p-2 ">password: </p>
                        </div>
                        <div className="c">
                            <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} className="m-2 border py-2 rounded  border-gray-300"/>
                            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="m-2 py-2 rounded  border border-gray-300" />
                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="m-2 py-2 rounded border   border-gray-300"/>
                        </div>
                    </div>
                    <div className="flex justify-center my-3 "><button onClick={handleSubmit} className="p-2 mx-2 w-32 hover:bg-blue-300 bg-blue-200 rounded">Login</button></div>
                    {error && <div className="text-red-700 text-center">{errorMessage} </div>}
                    <div className="flex justify-center my-3 items-center">
                        <p>Dont have an account ?</p> <button onClick={handleSignup} className="p-2 mx-2 hover:bg-blue-300 bg-blue-200 rounded ">Signup</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div className="w-1/2 flex flex-col justify-around">
        <div><img src={homeImage} alt="" width={500} className="mt-16"/></div>
        <div className="flex justify-end"><img src={deal} alt="" width={500} className="mr-10"/></div>
        </div>
       
    </div>
    </div>
    <Footer/>
</> )
}

export default Login