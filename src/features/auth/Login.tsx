import { useState } from "react"
import { api } from "../../api/apiClient"

export default function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleLogin = async () => {

    const res = await api.post("/auth/login",{
      email,
      password
    })

    localStorage.setItem("token",res.data.token)

  }

  return (

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button
        className="bg-black text-white w-full p-2"
        onClick={handleLogin}
        >
        Login
        </button>

      </div>

    </div>

  )

}