import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren" }
    }
  };

  const leftSideVariants = {
    hidden: { x: "50%", width: "100%", borderRadius: "24px" }, // Start centered and full width
    visible: { 
      x: 0, 
      width: "55%", // Slides to the left to reveal the right
      borderRadius: "24px 0 0 24px",
      transition: { delay: 0.8, duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { delay: 1.3, duration: 0.5 } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1.5 + (i * 0.1), duration: 0.5 }
    })
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/register";
    const payload = isLogin ? { email, password } : { name, email, password };
    try {
      const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, payload);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(isLogin ? "Invalid credentials" : "Registration failed.");
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT SIDE: Greets first, then slides left */}
        <motion.div 
          className="login-left"
          variants={leftSideVariants}
        >
          <motion.div 
            className="login-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {isLogin ? "SIGN IN" : "JOIN US"}
          </motion.div>
          
          <motion.div 
            className="school-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{ scale: { delay: 0.3, type: "spring" }, rotate: { repeat: Infinity, duration: 4 } }}
          >
            🎓
          </motion.div>

          <motion.h1 custom={0} variants={textVariants}>
            {isLogin ? "Welcome Back!" : "Start Your Journey"}
          </motion.h1>
          <motion.p custom={1} variants={textVariants}>
            {isLogin 
              ? "Access your academic portal and stay updated with your course progress."
              : "Create your student account today and join our digital learning community."}
          </motion.p>
        </motion.div>

        {/* RIGHT SIDE: Revealed from behind */}
        <motion.div 
          className="login-right"
          variants={rightSideVariants}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-form" : "signup-form"}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              className="form-wrapper"
            >
              <div className="user-icon">{isLogin ? "👤" : "📝"}</div>
              <h2>{isLogin ? "STUDENT LOGIN" : "CREATE ACCOUNT"}</h2>
              
              <form onSubmit={handleAuth}>
                {!isLogin && (
                    <div className="input-group">
                        <span className="icon-span">👤</span>
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                )}
                <div className="input-group">
                    <span className="icon-span">📧</span>
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <span className="icon-span">🔒</span>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {isLogin && (
                  <div className="form-footer">
                    <span className="forgot">Forgot Password?</span>
                  </div>
                )}

                <motion.button 
                  className="login-btn" 
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(136, 14, 79, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </motion.button>
              </form>

              <p className="toggle-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Log In"}
                </span>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;