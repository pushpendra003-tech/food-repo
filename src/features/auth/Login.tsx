import { Mail, Lock, UserRound, Building2, Truck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const { login, getRole } = useAuthStore();
  const [form, setForm] = useState({
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
  } as const;

  const RoleIcon = roleIcons[form.role];

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

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Simple mock validation (in production use backend)
      if (form.password.length < 6) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      // Create auth token with role
      const user = {
        email: form.email,
        role: form.role,
        token: `auth-${form.role}-${Date.now()}`,
      };

      localStorage.setItem('token', user.token);
      login(user);

      alert(`Welcome back ${form.role.toUpperCase()}! 🎉`);
      
      // Role-based redirect
      const rolePath = form.role === 'owner' ? '/owner/dashboard' : 
                      form.role === 'delivery' ? '/delivery/dashboard' : '/home';
      setTimeout(() => navigate(rolePath), 500);
      
    } catch (err) {
      setError("Login failed. Check credentials.");
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
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-400/70 to-transparent flex flex-col justify-center items-center text-white text-center px-10">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm">
            <RoleIcon className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Food Paradise</h1>
          <p className="max-w-lg text-xl opacity-95 leading-relaxed">
            Sign in as your role to access specialized dashboard
          </p>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 p-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <RoleIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-lg">Sign in to your role dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl text-red-700 text-sm shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="relative border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all group-hover:shadow-md">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all group-hover:shadow-md">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-12 outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors flex items-center gap-1"
              >
                Forgot Password?
              </button>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <UserRound className="w-4 h-4" />
                Role
              </label>
              <div className="border border-gray-200 rounded-2xl p-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-900 bg-transparent text-lg font-medium"
                >
                  <option value="user" className="py-3">👤 Customer - Order & Track</option>
                  <option value="owner" className="py-3">🏪 Owner - Manage Restaurant</option>
                  <option value="delivery" className="py-3">🚚 Delivery - Accept Orders</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Sign In Securely
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-gray-100 space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
            </p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 text-gray-800 py-3 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-orange-200"
            >
              Create New Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
