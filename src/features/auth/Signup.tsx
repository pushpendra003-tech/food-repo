import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    alert("Account created successfully 🍔");
  };

  return (
    <div className="h-screen flex">

      {/* LEFT IMAGE SECTION */}

      <div className="w-1/2 hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-10">
          <h1 className="text-5xl font-bold mb-4">Food Paradise</h1>

          <p className="max-w-md text-lg">
            Good food is the foundation of happiness.
            Discover amazing meals near you.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}

      <div className="flex flex-1 items-center justify-center bg-gray-100">

        <div className="w-full max-w-md p-8">

          <h1 className="text-4xl font-bold text-orange-500 mb-2">
            Welcome
          </h1>

          <p className="text-gray-500 mb-8">
            Create your food account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}

            <div>
              <label className="text-sm text-gray-600">Full Name</label>

              <div className="flex items-center border-2 border-orange-400 rounded-lg px-4 py-3 mt-1">

                <User className="text-gray-400 mr-3" size={20} />

                <input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full outline-none"
                />

              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-sm text-gray-600">Email</label>

              <div className="flex items-center border-2 border-orange-400 rounded-lg px-4 py-3 mt-1">

                <Mail className="text-gray-400 mr-3" size={20} />

                <input
                  name="email"
                  placeholder="foodlover@mail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full outline-none"
                />

              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="text-sm text-gray-600">Password</label>

              <div className="flex items-center border-2 border-orange-400 rounded-lg px-4 py-3 mt-1">

                <Lock className="text-gray-400 mr-3" size={20} />

                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full outline-none"
                />

              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Create Account
            </button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="border px-6 py-2 rounded-lg">Google</button>
            <button className="border px-6 py-2 rounded-lg">Facebook</button>
            <button className="border px-6 py-2 rounded-lg">Apple</button>
          </div>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <span className="text-orange-500 cursor-pointer">
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}