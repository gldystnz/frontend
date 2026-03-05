import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import "./Dashboard.css";

const enrollmentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 180 },
  { month: "Mar", students: 150 },
  { month: "Apr", students: 210 },
  { month: "May", students: 190 },
  { month: "Jun", students: 250 },
];

const courseData = [
  { name: "CS", students: 80 },
  { name: "IT", students: 65 },
  { name: "Engineering", students: 90 },
  { name: "Business", students: 70 },
  { name: "Education", students: 55 },
];

const pieData = [
  { name: "Enrolled", value: 540 },
  { name: "Pending", value: 120 },
  { name: "Dropped", value: 40 },
];

const PIE_COLORS = ["#e91e8c", "#667eea", "#ffb300"];

const recentStudents = [
  { name: "Maria Santos", course: "BS Computer Science", status: "enrolled" },
  { name: "Juan Dela Cruz", course: "BS Information Technology", status: "pending" },
  { name: "Ana Reyes", course: "BS Engineering", status: "enrolled" },
  { name: "Carlo Mendoza", course: "BS Business Admin", status: "dropped" },
  { name: "Liza Garcia", course: "BS Education", status: "enrolled" },
];

const botReplies = {
  "hello": "Hi there! How can I help you today? 😊",
  "hi": "Hello! Welcome to the Enrollment System 🎓",
  "enrollment": "Enrollment is open from June 1 - June 30. Visit the Enrollment tab for details.",
  "courses": "We offer CS, IT, Engineering, Business, and Education programs.",
  "help": "You can ask me about enrollment, courses, schedule, or requirements!",
  "schedule": "Classes start July 15. Check the Courses tab for full schedule.",
  "requirements": "Requirements: Form 138, PSA Birth Certificate, 2x2 photos, and Medical Certificate.",
};


function Dashboard() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null); // Ref for auto-scroll
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [weather, setWeather] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm your enrollment assistant 🎓 Ask me anything!" }
  ]);

  // Auto-scroll chatbot
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=7.1907&longitude=125.4553&current_weather=true")
      .then(res => res.json())
      .then(data => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    return "🌩️";
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.toLowerCase().trim();
    const reply = botReplies[userMsg] || "I'm not sure about that. Try asking about enrollment, courses, or requirements!";
    setMessages(prev => [
      ...prev,
      { type: "user", text: chatInput },
      { type: "bot", text: reply }
    ]);
    setChatInput("");
  };

  const navItems = [
    { label: "Dashboard", icon: "🏠", path: "/dashboard" },
    { label: "Students", icon: "👨‍🎓", path: "/students" },
    { label: "Courses", icon: "📚", path: "/courses" },
    { label: "Enrollment", icon: "📋", path: "/enrollment" },
    { label: "Reports", icon: "📊", path: "/reports" },
    { label: "Settings", icon: "⚙️", path: "/settings" },
  ];

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <motion.div 
        className="sidebar"
        initial={{ x: -240 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="sidebar-logo">
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>🎓</motion.span>
          Student Enrollment System
        </div>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <motion.li
              key={item.label}
              className={activeNav === item.label ? "active" : ""}
              onClick={() => { setActiveNav(item.label); navigate(item.path); }}
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon} {item.label}
            </motion.li>
          ))}
        </ul>
        <div className="sidebar-logout" onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>
          🚪 Logout
        </div>
      </motion.div>

      {/* MAIN */}
      <div className="main-content">
        <motion.div 
          className="topbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Welcome back 👋</h1>
          <div className="topbar-right">
            <span style={{ color: "#888", fontSize: "14px" }}>Admin User</span>
            <motion.div className="avatar" whileHover={{ scale: 1.1, rotate: 5 }}>A</motion.div>
          </div>
        </motion.div>

        {/* WIDGETS */}
        <motion.div className="widgets" variants={containerVars} initial="hidden" animate="visible">
          {[
            { icon: "👨‍🎓", color: "#fce4ec", label: "Total Students", value: "1,245" },
            { icon: "📚", color: "#e8eaf6", label: "Total Courses", value: "38" },
            { icon: "📋", color: "#e8f5e9", label: "Enrolled", value: "540" },
            { icon: "⏳", color: "#fff8e1", label: "Pending", value: "120" },
          ].map((w, i) => (
            <motion.div key={i} className="widget-card" variants={itemVars} whileHover={{ y: -5 }}>
              <div className="widget-icon" style={{ background: w.color }}>{w.icon}</div>
              <div className="widget-info">
                <h3>{w.value}</h3>
                <p>{w.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CHARTS */}
        <div className="charts-row">
          <motion.div className="chart-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <h3>📈 Monthly Enrollment Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#e91e8c" strokeWidth={3} animationDuration={2000} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div className="chart-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <h3>🥧 Enrollment Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" animationBegin={500}>
                  {pieData.map((entry, index) => <Cell key={index} fill={PIE_COLORS[index]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="bottom-row">
          {/* WEATHER */}
          <motion.div className="weather-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} whileHover={{ scale: 1.02 }}>
            <h3>🌤️ Weather — Davao City</h3>
            {weather ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="weather-main">
                  <motion.div className="weather-icon" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>{getWeatherIcon(weather.weathercode)}</motion.div>
                  <div className="weather-temp">{weather.temperature}°C</div>
                </div>
                <div className="weather-desc">Wind: {weather.windspeed} km/h</div>
                <div className="weather-location">📍 Davao City, Philippines</div>
              </motion.div>
            ) : <p>Loading weather...</p>}
          </motion.div>

          {/* CHATBOT */}
          <motion.div className="chatbot-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3>🤖 Enrollment Assistant</h3>
            <div className="chat-messages">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div key={i} className={`chat-msg ${msg.type}`} initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }}>
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-row">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask something..." />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={handleSend}>Send</motion.button>
            </div>
          </motion.div>

          {/* RECENT TABLE */}
          <motion.div className="table-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
            <h3>📋 Recent Enrollments</h3>
            <table>
              <thead><tr><th>Name</th><th>Course</th><th>Status</th></tr></thead>
              <tbody>
                {recentStudents.map((s, i) => (
                  <motion.tr key={i} whileHover={{ backgroundColor: "#f9f9f9" }}>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td><span className={`badge ${s.status}`}>{s.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;