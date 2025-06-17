import React, { useState } from "react";
import image1 from '../assets/signup1.png';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

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
      <div className="flex justify-center items-center bg-contain" style={{ backgroundImage: `url(${image1})` }}>
        <div className="w-1/3 p-4 m-8 rounded-lg bg-slate-400 shadow-xl">
          <form onSubmit={handleSubmit}>
            <p className="text-4xl text-center m-4 mb-8 font-semibold text-blue-400">Signup</p>

            {[
              { label: "Fullname", name: "fullname", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile", name: "mobile", type: "tel" },
              { label: "Address", name: "adress", type: "text" },
              { label: "Password", name: "password", type: "password" }
            ].map(({ label, name, type }) => (
              <div className="grid grid-cols-2 items-center my-6" key={name}>
                <div className="text-center text-xl">{label}</div>
                <div>
                  <input
                    type={type}
                    name={name}
                    value={formValues[name]}
                    onChange={handleInputChange}
                    className="w-full rounded p-2 border-2 border-gray-200"
                    required
                  />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 items-center my-6">
              <div className="text-center text-xl">Avatar</div>
              <div>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full rounded p-2 border-2 border-gray-200"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center my-4">
              <button type="submit" className="bg-blue-300 hover:bg-blue-600 rounded-lg text-xl text-white p-2 w-72">
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
