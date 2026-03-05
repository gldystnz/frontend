import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import "./Students.css";

const studentsData = [
  { id: "2024-0001", name: "Ana Reyes", course: "BS Computer Science", year: "2nd Year", status: "enrolled", email: "ana.reyes@school.edu" },
  { id: "2024-0002", name: "Angelo Santos", course: "BS Information Technology", year: "1st Year", status: "pending", email: "angelo.santos@school.edu" },
  { id: "2024-0003", name: "Beatrice Lim", course: "BS Engineering", year: "3rd Year", status: "enrolled", email: "beatrice.lim@school.edu" },
  { id: "2024-0004", name: "Carlo Mendoza", course: "BS Business Admin", year: "2nd Year", status: "dropped", email: "carlo.mendoza@school.edu" },
  { id: "2024-0005", name: "Carmela Cruz", course: "BS Education", year: "4th Year", status: "enrolled", email: "carmela.cruz@school.edu" },
  { id: "2024-0006", name: "Daniel Garcia", course: "BS Computer Science", year: "1st Year", status: "enrolled", email: "daniel.garcia@school.edu" },
  { id: "2024-0007", name: "Diana Torres", course: "BS Information Technology", year: "3rd Year", status: "pending", email: "diana.torres@school.edu" },
  { id: "2024-0008", name: "Eduardo Flores", course: "BS Engineering", year: "2nd Year", status: "enrolled", email: "eduardo.flores@school.edu" },
  { id: "2024-0009", name: "Elena Ramos", course: "BS Business Admin", year: "1st Year", status: "enrolled", email: "elena.ramos@school.edu" },
  { id: "2024-0010", name: "Felix Navarro", course: "BS Education", year: "4th Year", status: "dropped", email: "felix.navarro@school.edu" },
  { id: "2024-0011", name: "Gloria Reyes", course: "BS Computer Science", year: "2nd Year", status: "enrolled", email: "gloria.reyes@school.edu" },
  { id: "2024-0012", name: "Henry Dela Cruz", course: "BS Information Technology", year: "3rd Year", status: "enrolled", email: "henry.delacruz@school.edu" },
  { id: "2024-0013", name: "Isabel Magno", course: "BS Engineering", year: "1st Year", status: "pending", email: "isabel.magno@school.edu" },
  { id: "2024-0014", name: "Jose Aquino", course: "BS Business Admin", year: "2nd Year", status: "enrolled", email: "jose.aquino@school.edu" },
  { id: "2024-0015", name: "Karen Santos", course: "BS Education", year: "3rd Year", status: "enrolled", email: "karen.santos@school.edu" },
  { id: "2024-0016", name: "Lance Villanueva", course: "BS Computer Science", year: "4th Year", status: "enrolled", email: "lance.villanueva@school.edu" },
  { id: "2024-0017", name: "Maria Gonzales", course: "BS Information Technology", year: "1st Year", status: "pending", email: "maria.gonzales@school.edu" },
  { id: "2024-0018", name: "Nathan Perez", course: "BS Engineering", year: "2nd Year", status: "enrolled", email: "nathan.perez@school.edu" },
  { id: "2024-0019", name: "Olivia Castillo", course: "BS Business Admin", year: "3rd Year", status: "enrolled", email: "olivia.castillo@school.edu" },
  { id: "2024-0020", name: "Paulo Bautista", course: "BS Education", year: "4th Year", status: "dropped", email: "paulo.bautista@school.edu" },
];

const avatarColors = ["#e91e8c", "#880e4f", "#667eea", "#764ba2", "#f57f17", "#2e7d32"];

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2);
}

function getColor(name) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export default function Students() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [activeNav, setActiveNav] = useState("Students");

  const courses = ["All", "BS Computer Science", "BS Information Technology", "BS Engineering", "BS Business Admin", "BS Education"];
  const statuses = ["All", "enrolled", "pending", "dropped"];

  const filtered = studentsData
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter(s => filterCourse === "All" || s.course === filterCourse)
    .filter(s => filterStatus === "All" || s.status === filterStatus)
    .sort((a, b) => a.name.localeCompare(b.name));

  const grouped = filtered.reduce((acc, student) => {
    const letter = student.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(student);
    return acc;
  }, {});

  const navItems = [
  { label: "Dashboard", icon: "🏠", path: "/dashboard" },
  { label: "Students", icon: "👨‍🎓", path: "/students" },
  { label: "Courses", icon: "📚", path: "/courses" },
  { label: "Enrollment", icon: "📋", path: "/enrollment" },
  { label: "Reports", icon: "📊", path: "/reports" },
  { label: "Settings", icon: "⚙️", path: "/settings" },
];

  const handleNav = (item) => {
  setActiveNav(item.label);
  navigate(item.path);
};

  return (
    <div className="students-wrapper">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo"><span>🎓</span> Student Enrollment System</div>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <motion.li
              key={item.label}
              className={activeNav === item.label ? "active" : ""}
              onClick={() => handleNav(item)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon} {item.label}
            </motion.li>
          ))}
        </ul>
        <div className="sidebar-logout" onClick={() => navigate("/")}>🚪 Logout</div>
      </div>

      <div className="students-content">
        <motion.div 
          className="students-topbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>👨‍🎓 Students</h1>
          <div style={{ color: "#888", fontSize: "14px" }}>{filtered.length} students found</div>
        </motion.div>

        <div className="students-main">
          {/* LEFT PANEL */}
          <motion.div 
            className="students-list-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="search-bar">
              <span>🔍</span>
              <input placeholder="Search student..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="filter-row">
              <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
                {courses.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="alphabet-scroll">
              <LayoutGroup>
                {Object.keys(grouped).sort().map(letter => (
                  <motion.div layout className="alphabet-group" key={letter}>
                    <div className="alphabet-letter">{letter}</div>
                    {grouped[letter].map(student => (
                      <motion.div
                        layout
                        key={student.id}
                        className={`student-item ${selected?.id === student.id ? "selected" : ""}`}
                        onClick={() => setSelected(student)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ x: 8, backgroundColor: "#fce4ec" }}
                      >
                        <div className="student-avatar" style={{ background: getColor(student.name) }}>
                          {getInitials(student.name)}
                        </div>
                        <div className="student-item-info">
                          <h4>{student.name}</h4>
                          <p>{student.course}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </LayoutGroup>
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <div className="id-card-panel">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div 
                  key="empty" 
                  className="no-selection"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>👆</motion.span>
                  <p>Select a student to view their ID card</p>
                </motion.div>
              ) : (
                <motion.div 
                  key={selected.id}
                  className="id-card"
                  initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100 }}
                >
                  <div className="id-card-left">
                    <div className="id-school-name">🎓 Student Enrollment System</div>
                    <div className="id-school-sub">Official Student Identification Card</div>

                    <motion.div className="id-photo-box" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      {getInitials(selected.name)}
                    </motion.div>

                    <div className="id-field">
                      <div className="id-field-value">{selected.name}</div>
                      <div className="id-field-label">Name</div>
                    </div>
                    <div className="id-field">
                      <div className="id-field-value">{selected.id}</div>
                      <div className="id-field-label">Student ID</div>
                    </div>
                    <div className="id-field">
                      <div className="id-field-value">{selected.course}</div>
                      <div className="id-field-label">Course</div>
                    </div>
                    <div className="id-field">
                      <div className="id-field-value">{selected.year}</div>
                      <div className="id-field-label">Year Level</div>
                    </div>

                    <div className="id-card-bottom">
                      <div>
                        <div className="id-year">2024</div>
                        <span className={`id-status ${selected.status}`}>{selected.status}</span>
                      </div>
                      <motion.div 
                        className="id-seal"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        🎓
                      </motion.div>
                    </div>
                  </div>
                  <div className="id-card-right">
                    <span>Student Enrollment System</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}