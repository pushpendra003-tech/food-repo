import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    const storedUser = localStorage.getItem("user");

    if(!storedUser){
      alert("No account found. Please signup first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if(user.email === email && user.password === password){

      localStorage.setItem("token","dummy-token");

      alert("Login Successful 🍔");

      navigate("/home");

    }else{

      alert("Invalid Email or Password");

    }

  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}

      <div className="hidden md:flex w-1/2 relative">

        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-10">

          <h1 className="text-5xl font-bold mb-4">
            Food Paradise
          </h1>

          <p className="max-w-md text-lg">
            Login and enjoy amazing meals.
          </p>

        </div>

      </div>

      {/* LOGIN FORM */}

      <div className="flex flex-1 items-center justify-center bg-gray-100">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-3xl font-bold text-orange-500 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Login to continue
          </p>

          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 mb-4">
            <Mail className="text-gray-400 mr-3" size={20}/>
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 mb-6">
            <Lock className="text-gray-400 mr-3" size={20}/>
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <span
              onClick={()=>navigate("/signup")}
              className="text-orange-500 cursor-pointer"
            >
              Create Account
            </span>
          </p>

        </div>

      </div>

    </div>

  );
}