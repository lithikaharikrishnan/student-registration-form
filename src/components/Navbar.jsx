
import {
  GraduationCap,
  LayoutDashboard,
  UserPlus,
  Users
} from "lucide-react";

import "../style/Navbar.css";

function Navbar({ setPage }) {
  return (
    <header className="navbar">
      <div className="logo">
        <GraduationCap size={32} />
        <span>Student Portal</span>
      </div>

      <nav className="nav-links">
        <button onClick={() => setPage("dashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button onClick={() => setPage("register")}>
          <UserPlus size={18} />
          Registration
        </button>

        <button onClick={() => setPage("students")}>
          <Users size={18} />
          Students
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
