import  { useState } from "react";
import image1 from '../assets/signup1.png';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { FaUser, FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLock, FaImage } from "react-icons/fa";


function SignupPage() {
  const navigate = useNavigate();


  const [formValues, setFormValues] = useState({
    fullname: '',
    username: '',
    email: '',
    mobile: '',
    adress: '',
    password: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, val]) =>
      formData.append(key, val)
    );
    formData.append("avatar", avatarFile);

    const response = await fetch("http://localhost:3000/api/v1/user/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (response?.statuscode === 201) {
      navigate("/user/login");
    } else if(response?.statuscode === 401){
      alert('vatar file is required')
    }else if(response?.statuscode === 409){
        alert('User already exists with this username')
    }
  };

  return (
    <>
      <Header />
      <div
  className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
  style={{ backgroundImage: `url(${image1})` }}
>
  <div className="w-full max-w-xl bg-white/90 p-6 rounded-xl shadow-2xl backdrop-blur-md">
    <form onSubmit={handleSubmit}>
      <h2 className="text-4xl text-center mb-8 font-bold text-blue-500">Signup</h2>
      {[
        { Icon: FaUser, name: "fullname", type: "text", placeholder: "Full Name" },
        { Icon: FaUserCircle, name: "username", type: "text", placeholder: "Username" },
        { Icon: FaEnvelope, name: "email", type: "email", placeholder: "Email" },
        { Icon: FaPhoneAlt, name: "mobile", type: "tel", placeholder: "Mobile" },
        { Icon: FaMapMarkerAlt, name: "adress", type: "text", placeholder: "Address" },
        { Icon: FaLock, name: "password", type: "password", placeholder: "Password" },
      ].map(({ Icon, name, type, placeholder }) => (
        <div key={name} className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 shadow-sm bg-white">
          <Icon className="text-gray-500 mr-3 text-lg" />
          <input
            type={type}
            name={name}
            value={formValues[name]}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full outline-none bg-transparent"
            required
          />
        </div>
      ))}

     
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-6 shadow-sm bg-white">
        <FaImage className="text-gray-500 mr-3 text-lg" />
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className="w-full outline-none bg-transparent"
          required
        />
      </div>

      
      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Signup
        </button>
      </div>
    </form>
  </div>
</div>
      <Footer />
    </>
  );
}

export default SignupPage;
