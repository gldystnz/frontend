import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import "./Enrollment.css";
import "./Dashboard.css";

// ... enrollmentData, navItems, and confettiColors remain exactly the same ...
const enrollmentData = [
  { id: "2024-0001", name: "Ana Reyes", course: "BS Computer Science", year: "2nd Year", status: "enrolled", date: "Jan 15, 2024" },
  { id: "2024-0002", name: "Angelo Santos", course: "BS Information Technology", year: "1st Year", status: "pending", date: "Jan 16, 2024" },
  { id: "2024-0003", name: "Beatrice Lim", course: "BS Engineering", year: "3rd Year", status: "enrolled", date: "Jan 17, 2024" },
  { id: "2024-0004", name: "Carlo Mendoza", course: "BS Business Admin", year: "2nd Year", status: "dropped", date: "Jan 18, 2024" },
  { id: "2024-0005", name: "Carmela Cruz", course: "BS Education", year: "4th Year", status: "enrolled", date: "Jan 19, 2024" },
  { id: "2024-0006", name: "Daniel Garcia", course: "BS Computer Science", year: "1st Year", status: "enrolled", date: "Jan 20, 2024" },
  { id: "2024-0007", name: "Diana Torres", course: "BS Information Technology", year: "3rd Year", status: "pending", date: "Jan 21, 2024" },
  { id: "2024-0008", name: "Eduardo Flores", course: "BS Engineering", year: "2nd Year", status: "enrolled", date: "Jan 22, 2024" },
  { id: "2024-0009", name: "Elena Ramos", course: "BS Business Admin", year: "1st Year", status: "enrolled", date: "Jan 23, 2024" },
  { id: "2024-0010", name: "Felix Navarro", course: "BS Education", year: "4th Year", status: "dropped", date: "Jan 24, 2024" },
];

const navItems = [
  { label: "Dashboard", icon: "🏠", path: "/dashboard" },
  { label: "Students", icon: "👨‍🎓", path: "/students" },
  { label: "Courses", icon: "📚", path: "/courses" },
  { label: "Enrollment", icon: "📋", path: "/enrollment" },
  { label: "Reports", icon: "📊", path: "/reports" },
  { label: "Settings", icon: "⚙️", path: "/settings" },
];

const confettiColors = ["#e91e8c", "#880e4f", "#667eea", "#ffb300", "#2e7d32", "#764ba2"];

export default function Enrollment() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Enrollment");
  const [screen, setScreen] = useState("main");
  const [step, setStep] = useState(1);
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    course: "", year: "", semester: "", address: ""
  });

  const filtered = enrollmentData
    .filter(s => filterCourse === "All" || s.course === filterCourse)
    .filter(s => filterStatus === "All" || s.status === filterStatus)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const totalEnrolled = enrollmentData.filter(s => s.status === "enrolled").length;
  const totalPending = enrollmentData.filter(s => s.status === "pending").length;
  const totalDropped = enrollmentData.filter(s => s.status === "dropped").length;

  const handleSubmit = () => { setScreen("success"); setStep(1); };
  const handleFormChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: `${Math.random() * 8 + 6}px`,
  }));

  return (
    <div className="enrollment-wrapper">
      {/* SIDEBAR */}
      <motion.div className="sidebar" initial={{ x: -240 }} animate={{ x: 0 }}>
        <div className="sidebar-logo"><span>🎓</span> Student Enrollment System</div>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <motion.li
              key={item.label}
              className={activeNav === item.label ? "active" : ""}
              onClick={() => { setActiveNav(item.label); navigate(item.path); }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon} {item.label}
            </motion.li>
          ))}
        </ul>
        <div className="sidebar-logout" onClick={() => navigate("/")}>🚪 Logout</div>
      </motion.div>

      <div className="enrollment-content">
        <div className="enrollment-topbar">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>📋 Enrollment</motion.h1>
          <motion.button 
            className="enroll-now-btn" 
            onClick={() => setScreen("welcome")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Enroll Now
          </motion.button>
        </div>

        {/* STATS with Stagger */}
        <div className="enrollment-stats">
          {[
            { icon: "👨‍🎓", color: "#fce4ec", label: "Total Students", value: enrollmentData.length },
            { icon: "✅", color: "#e8f5e9", label: "Enrolled", value: totalEnrolled },
            { icon: "⏳", color: "#fff8e1", label: "Pending", value: totalPending },
            { icon: "❌", color: "#fce4ec", label: "Dropped", value: totalDropped },
          ].map((s, i) => (
            <motion.div 
              className="stat-card" 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
              <div className="stat-info">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="enrollment-filters">
          <div className="enrollment-search">
            <span>🔍</span>
            <input placeholder="Search student..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
            <option>All</option>
            <option>BS Computer Science</option>
            <option>BS Information Technology</option>
            <option>BS Engineering</option>
            <option>BS Business Admin</option>
            <option>BS Education</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option>All</option>
            <option>enrolled</option>
            <option>pending</option>
            <option>dropped</option>
          </select>
        </div>

        <motion.div 
          className="enrollment-table-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>📜 Enrollment Records</h3>
          <table className="enrollment-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Year Level</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((s, i) => (
                  <motion.tr 
                    key={s.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.year}</td>
                    <td>{s.date}</td>
                    <td><span className={`badge ${s.status}`}>{s.status}</span></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* OVERLAYS */}
      <AnimatePresence>
        {screen !== "main" && (
          <motion.div 
            className="enrollment-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {screen === "welcome" && (
              <motion.div 
                className="welcome-card"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.div className="welcome-icon" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🎓</motion.div>
                <h2>Welcome to Enrollment!</h2>
                <p>Begin your academic journey with us. Fill out your information and secure your slot today!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <button className="start-btn" onClick={() => setScreen("form")}>Start Enrolling →</button>
                  <button className="cancel-btn" onClick={() => setScreen("main")}>Cancel</button>
                </div>
              </motion.div>
            )}

            {screen === "form" && (
              <motion.div 
                className="form-card"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
              >
                {/* STEPPER */}
                <div className="stepper">
                  {["Personal", "Course", "Confirm"].map((label, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                      <div className="step">
                        <motion.div 
                          className={`step-circle ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}`}
                          animate={step === i + 1 ? { scale: 1.2 } : { scale: 1 }}
                        >
                          {step > i + 1 ? "✓" : i + 1}
                        </motion.div>
                        <div className={`step-label ${step === i + 1 ? "active" : ""}`}>{label}</div>
                      </div>
                      {i < 2 && <div className={`step-line ${step > i + 1 ? "done" : ""}`} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {step === 1 && (
                      <div className="step-content">
                        <h3>Personal Information</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label>First Name</label>
                            <input name="firstName" value={form.firstName} onChange={handleFormChange} />
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastName" value={form.lastName} onChange={handleFormChange} />
                          </div>
                        </div>
                        <div className="form-group"><label>Email</label><input name="email" value={form.email} onChange={handleFormChange} /></div>
                        <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handleFormChange} /></div>
                        <div className="form-group"><label>Address</label><input name="address" value={form.address} onChange={handleFormChange} /></div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="step-content">
                        <h3>Course Selection</h3>
                        <div className="form-group">
                          <label>Select Course</label>
                          <select name="course" value={form.course} onChange={handleFormChange}>
                            <option value="">-- Select Course --</option>
                            <option>BS Computer Science</option>
                            <option>BS Information Technology</option>
                            <option>BS Engineering</option>
                            <option>BS Business Admin</option>
                            <option>BS Education</option>
                          </select>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Year Level</label>
                            <select name="year" value={form.year} onChange={handleFormChange}>
                              <option value="">-- Select Year --</option>
                              <option>1st Year</option><option>2nd Year</option>
                              <option>3rd Year</option><option>4th Year</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Semester</label>
                            <select name="semester" value={form.semester} onChange={handleFormChange}>
                              <option value="">-- Select Semester --</option>
                              <option>1st Semester</option><option>2nd Semester</option><option>Summer</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="step-content">
                        <h3>Confirm Details</h3>
                        <div className="confirm-list">
                          {[{ l: "Name", v: `${form.firstName} ${form.lastName}` }, { l: "Course", v: form.course }, { l: "Year", v: form.year }].map((item, i) => (
                            <div key={i} className="confirm-item">
                              <span>{item.l}</span>
                              <strong>{item.v || "—"}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="form-actions">
                  <button className="prev-btn" onClick={() => step === 1 ? setScreen("welcome") : setStep(step - 1)}>
                    ← {step === 1 ? "Back" : "Previous"}
                  </button>
                  <button className="next-btn" onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}>
                    {step < 3 ? "Next →" : "Submit ✓"}
                  </button>
                </div>
              </motion.div>
            )}

            {screen === "success" && (
              <motion.div 
                className="success-card"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="confetti">
                  {confettiPieces.map(p => (
                    <motion.div 
                      key={p.id} 
                      className="confetti-piece"
                      initial={{ y: -20, opacity: 1 }}
                      animate={{ y: 600, opacity: 0, rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                      style={{ background: p.color, left: p.left, width: p.size, height: p.size }}
                    />
                  ))}
                </div>
                <motion.div className="success-icon" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: 0.2 }}>🎉</motion.div>
                <h2>Enrollment Submitted!</h2>
                <p>Congratulations! Your enrollment has been successfully submitted.</p>
                <button className="ok-btn" onClick={() => { setScreen("main"); setForm({ firstName: "", lastName: "", email: "", phone: "", course: "", year: "", semester: "", address: "" }); }}>OK 🎓</button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}