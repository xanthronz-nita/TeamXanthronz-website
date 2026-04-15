import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // clear error on every keystroke
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/login", form);
      const { accessToken, user } = res.data.data;

      // store token + user in auth context
      login(accessToken, user);

      // redirect based on role
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen w-full text-white px-4">

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-[#00FF88]/5 blur-[160px]" />
      </div>
      <div className="pointer-events-none absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-[#00CCFF]/4 blur-[120px]" />

      <motion.div
        className="relative z-10 w-full max-w-md flex flex-col gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/25 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.25em]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse" />
            TEAM XANTHRONZ
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 text-center">
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-[#00FF88] via-[#00DD77] to-[#00CCFF] bg-clip-text text-transparent"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            WELCOME BACK
          </h1>
          <p className="text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/[0.03] border border-white/8 rounded-2xl p-8"
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@xanthronz.com"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF88]/50 focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF88]/50 focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            className="mt-2 w-full px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.2em] shadow-[0_0_28px_rgba(0,255,136,0.3)] hover:shadow-[0_0_44px_rgba(0,255,136,0.5)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </motion.button>
        </motion.form>

        {/* Register link */}
        <motion.p variants={fadeUp} className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#00FF88] hover:text-[#00CCFF] transition-colors duration-300 font-semibold"
          >
            Register
          </Link>
        </motion.p>

      </motion.div>
    </section>
  );
}