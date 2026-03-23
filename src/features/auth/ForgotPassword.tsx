import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email");
      return;
    }

    setStatus("loading");
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
      setMessage("Password reset link sent! Check your email.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to send reset link.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50 p-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email!</h2>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">{message}</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-400/70 to-transparent flex flex-col justify-center items-center text-white text-center px-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Reset Password</h1>
          <p className="max-w-lg text-xl opacity-95 leading-relaxed">
            Recover access to your account securely
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 p-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
          
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600 text-lg">Enter your email to reset</p>
          </div>

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl text-red-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="relative border border-gray-200 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

