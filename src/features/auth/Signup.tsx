import { Mail, Lock, User, UserRound, Building2, Truck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

import SignupWithGoogle from "./SignupWithGoogle";
import SignupWithFacebook from "./SignupWithFacebook";

export default function Signup() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "user" | "owner" | "delivery",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roleIcons = {
    user: UserRound,
    owner: Building2,
    delivery: Truck,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create user object with role
      const user = {
        email: form.email,
        role: form.role,
        token: "role-auth-token-" + Date.now(),
      };

      // Use auth store
      login(user);

      alert(`Welcome ${form.role.toUpperCase()}! Account created successfully 🎉`);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
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
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-500/80 to-transparent flex flex-col justify-center items-center text-white text-center px-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-white/20 rounded-2xl px-8 py-4 backdrop-blur-sm">
            Food Paradise
          </h1>
          <p className="max-w-md text-xl opacity-95 leading-relaxed">
            Join as User, Restaurant Owner, or Delivery Partner
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50 p-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join our food ecosystem</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                <User className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                <Mail className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                <Lock className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
              <div className="border border-gray-200 rounded-2xl p-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-900 bg-transparent"
                >
                  <option value="user">👤 Customer (Order Food)</option>
                  <option value="owner">🏪 Restaurant Owner (Manage Restaurant)</option>
                  <option value="delivery">🚚 Delivery Partner (Accept Orders)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account 🚀'
              )}
            </button>
            <SignupWithGoogle />
            <SignupWithFacebook />

            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
