import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import "./Courses.css";

// ... coursesData and departments remain exactly as provided ...
const coursesData = [
  { id: 1, code: "BSCS", name: "BS Computer Science", shortDesc: "Study algorithms, software development, and computational theory.", fullDesc: "The Bachelor of Science in Computer Science program provides students with a strong foundation in computing principles, software engineering, data structures, algorithms, and artificial intelligence. Graduates are equipped to design and develop software systems, conduct research, and solve complex computational problems in various industries.", icon: "💻", color: "#e8eaf6", department: "College of Computing", units: 180, schedule: "MWF 7:30-8:30 AM", slots: "40/40", status: "Full", professors: [ { name: "Dr. Ramon Cruz", role: "Program Chair", initials: "RC" }, { name: "Prof. Ana Santos", role: "Core Faculty", initials: "AS" }, { name: "Prof. Daniel Reyes", role: "Core Faculty", initials: "DR" }, ], },
  { id: 2, code: "BSIT", name: "BS Information Technology", shortDesc: "Learn to manage and develop IT systems, networks, and web applications.", fullDesc: "The Bachelor of Science in Information Technology program focuses on practical applications of technology in business and organizational settings. Students gain expertise in systems analysis, network administration, web development, database management, and IT project management. Graduates are prepared for careers as IT professionals in various industries.", icon: "🌐", color: "#e8f5e9", department: "College of Computing", units: 180, schedule: "TTH 9:00-10:30 AM", slots: "35/40", status: "Open", professors: [ { name: "Prof. Maria Reyes", role: "Program Chair", initials: "MR" }, { name: "Prof. Carlo Bautista", role: "Core Faculty", initials: "CB" }, ], },
  { id: 3, code: "BSENG", name: "BS Engineering", shortDesc: "Apply mathematics and science to design and build engineering solutions.", fullDesc: "The Bachelor of Science in Engineering program provides a rigorous education in engineering principles, mathematics, and applied sciences. Students develop skills in design, analysis, and problem-solving across various engineering disciplines. The program emphasizes hands-on laboratory work, project-based learning, and real-world applications.", icon: "⚙️", color: "#fff8e1", department: "College of Engineering", units: 200, schedule: "MWF 10:00-11:30 AM", slots: "28/40", status: "Open", professors: [ { name: "Dr. Jose Villanueva", role: "Program Chair", initials: "JV" }, { name: "Prof. Grace Mendoza", role: "Core Faculty", initials: "GM" }, ], },
  { id: 4, code: "BSBA", name: "BS Business Admin", shortDesc: "Master business management, marketing, finance and organizational leadership.", fullDesc: "The Bachelor of Science in Business Administration program prepares students for leadership roles in the business world. The curriculum covers management principles, marketing strategies, financial analysis, accounting, business law, and entrepreneurship. Students develop critical thinking, communication, and decision-making skills essential for business success.", icon: "📊", color: "#fce4ec", department: "College of Business", units: 175, schedule: "TTH 1:00-2:30 PM", slots: "38/40", status: "Open", professors: [ { name: "Prof. Elena Gomez", role: "Program Chair", initials: "EG" }, { name: "Prof. Ryan Torres", role: "Core Faculty", initials: "RT" }, { name: "Prof. Liza Garcia", role: "Core Faculty", initials: "LG" }, ], },
  { id: 5, code: "BSED", name: "BS Education", shortDesc: "Prepare to become an effective and inspiring teacher in various fields.", fullDesc: "The Bachelor of Science in Education program develops competent and committed educators for various levels of schooling. Students study educational psychology, curriculum development, teaching methodologies, classroom management, and assessment. The program includes extensive field practice to prepare graduates for the real challenges of teaching.", icon: "🎓", color: "#f3e5f5", department: "College of Education", units: 170, schedule: "MWF 1:00-2:00 PM", slots: "20/40", status: "Open", professors: [ { name: "Dr. Patricia Lim", role: "Program Chair", initials: "PL" }, { name: "Prof. Mark Dela Cruz", role: "Core Faculty", initials: "MD" }, ], },
];
const departments = ["All", "College of Computing", "College of Engineering", "College of Business", "College of Education"];

export default function Courses() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filterDept, setFilterDept] = useState("All");
  const [activeNav, setActiveNav] = useState("Courses");

  const filtered = coursesData
    .filter(c => filterDept === "All" || c.department === filterDept)
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    );

  const navItems = [
    { label: "Dashboard", icon: "🏠", path: "/dashboard" },
    { label: "Students", icon: "👨‍🎓", path: "/students" },
    { label: "Courses", icon: "📚", path: "/courses" },
    { label: "Enrollment", icon: "📋", path: "/enrollment" },
    { label: "Reports", icon: "📊", path: "/reports" },
    { label: "Settings", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className="courses-wrapper">
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

      <div className="courses-content">
        <div className="courses-topbar">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>📚 Courses</motion.h1>
          <div className="courses-topbar-right">
            <AnimatePresence>
              {showSearch && (
                <motion.div 
                  className="search-box"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                >
                  <span style={{ marginRight: 8 }}>🔍</span>
                  <input
                    placeholder="Search course..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button 
              className="search-toggle" 
              onClick={() => setShowSearch(!showSearch)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showSearch ? "✕" : "🔍"}
            </motion.button>
          </div>
        </div>

        <div className="filter-tabs">
          {departments.map((dept, idx) => (
            <motion.button
              key={dept}
              className={`filter-tab ${filterDept === dept ? "active" : ""}`}
              onClick={() => setFilterDept(dept)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {dept}
            </motion.button>
          ))}
        </div>

        <div className="courses-main">
          <motion.div 
            className="courses-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((course, idx) => (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`course-tile ${selected?.id === course.id ? "selected" : ""}`}
                  onClick={() => setSelected(course)}
                  whileHover={{ x: 10 }}
                >
                  <div className="course-icon" style={{ background: course.color }}>
                    {course.icon}
                  </div>
                  <div className="course-tile-info">
                    <h3>{course.name}</h3>
                    <p>{course.shortDesc}</p>
                    <div className="course-tile-footer">
                      <span className="course-creator">
                        By <span>{course.professors[0].name}</span>
                      </span>
                    </div>
                  </div>
                  <motion.div 
                    className="course-arrow"
                    animate={{ x: selected?.id === course.id ? 5 : 0 }}
                  >›</motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="courses-right">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div 
                  key="empty"
                  className="no-selection-right"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>📚</motion.span>
                  <p>Select a course to view details</p>
                </motion.div>
              ) : (
                <motion.div 
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}
                >
                  <div className="course-detail-card">
                    <motion.div 
                      className="course-detail-banner" 
                      style={{ background: selected.color }}
                      layoutId={`icon-${selected.id}`}
                    >
                      {selected.icon}
                    </motion.div>
                    <h2>{selected.name}</h2>
                    <div className="course-detail-tags">
                      <span className="course-tag">{selected.code}</span>
                      <span className="course-tag">{selected.department}</span>
                      <span className="course-tag">{selected.units} Units</span>
                      <motion.span 
                        className="course-tag" 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{
                          background: selected.status === "Open" ? "#e8f5e9" : "#fce4ec",
                          color: selected.status === "Open" ? "#2e7d32" : "#c62828"
                        }}
                      >{selected.status}</motion.span>
                    </div>
                    <p className="course-detail-desc">{selected.fullDesc}</p>
                    <div className="course-detail-info">
                      {[{l: "Schedule", v: selected.schedule}, {l: "Slots", v: selected.slots}, {l: "Department", v: selected.department}, {l: "Units", v: selected.units + " Units"}].map((info, i) => (
                        <div className="course-info-item" key={i}>
                          <p>{info.l}</p>
                          <p>{info.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    className="professors-card"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3>👨‍🏫 Professors</h3>
                    <div className="professor-list">
                      {selected.professors.map((prof, i) => (
                        <motion.div 
                          key={i} 
                          className="professor-item"
                          whileHover={{ x: 5 }}
                        >
                          <div className="professor-avatar">{prof.initials}</div>
                          <div className="professor-info">
                            <h4>{prof.name}</h4>
                            <p>{prof.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}