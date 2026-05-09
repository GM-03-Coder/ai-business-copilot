import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const navStyle = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  return (

    <div className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <span>🔥</span> Buildly
      </div>

      {/* NAVIGATION */}
      <div className="nav-links">

        <NavLink to="/" className={navStyle}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/customer" className={navStyle}>
          👥 Customer
        </NavLink>

        <NavLink to="/analysis" className={navStyle}>
          📈 Analysis
        </NavLink>

        <NavLink to="/insights" className={navStyle}>
          🧠 AI Insights
        </NavLink>

        <NavLink to="/simulator" className={navStyle}>
          ⚙️ Simulator
        </NavLink>

      </div>

    </div>
  );
}