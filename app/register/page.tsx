"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error("Registration failed: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Registered with Google!");
      router.push("/");
    } catch (err: any) {
      toast.error("Google sign-in failed: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FCF5EE] px-4">
      <Toaster position="top-right" />

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FCF5EE] to-[#FFE3E3] animate-gradient-x"
        style={{ zIndex: -1 }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#EE6983]/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#850E35]/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#FFC4C4] w-full max-w-md p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-[#850E35]">Register</h1>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full py-3 mb-4 bg-[#EE6983] text-[#FCF5EE] font-semibold rounded-xl shadow-md hover:bg-[#d94f6b] transition transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <FcGoogle></FcGoogle>
          Sign up with Google
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-1 border-[#850E35]/30" />
          <span className="px-2 text-[#850E35]/70">OR</span>
          <hr className="flex-1 border-[#850E35]/30" />
        </div>

        {/* Email Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-[#850E35]/80 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#EE6983] font-semibold hover:underline">
            Login
          </a>
        </p>
      </motion.div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 20s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
