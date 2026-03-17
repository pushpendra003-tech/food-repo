import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("Account created successfully 🍔");

    navigate("/login");
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
            Discover the best food near you.
          </p>

        </div>

      </div>

      {/* RIGHT FORM */}

      <div className="flex flex-1 items-center justify-center bg-gray-100">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-3xl font-bold text-orange-500 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6">
            Join the food lovers community
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <User className="text-gray-400 mr-3" size={20} />
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <Mail className="text-gray-400 mr-3" size={20} />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <Lock className="text-gray-400 mr-3" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Sign Up
            </button>

          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}