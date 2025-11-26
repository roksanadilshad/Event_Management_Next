"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const redirect = searchParams.get("redirect") || "/"; 
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      router.push(redirect);
    } catch (err: any) {
      toast.error("Login failed: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      router.push(redirect);
    } catch (err: any) {
      toast.error("Google login failed: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCF5EE] to-[#FFE3E3] px-4">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFC4C4] w-full max-w-md p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-[#850E35]">Login</h1>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 bg-[#EE6983] text-[#FCF5EE] font-semibold rounded-xl shadow-md hover:bg-[#d94f6b] transition transform hover:scale-105 flex items-center justify-center gap-2"
        >
         <FcGoogle></FcGoogle>
          Sign in with Google
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-1 border-[#850E35]/30" />
          <span className="px-2 text-[#850E35]/70">OR</span>
          <hr className="flex-1 border-[#850E35]/30" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-[#EE6983] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-[#EE6983] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EE6983]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#850E35] text-[#FCF5EE] font-semibold rounded-xl shadow-md hover:bg-[#6a0c2a] transition transform hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-[#850E35]/80 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#EE6983] font-semibold hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
