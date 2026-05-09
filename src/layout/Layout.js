import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/dashboard.css";

export default function Layout({ children }) {

  return (

    <div className="layout">

      <Sidebar />

      <div className="main">

        <Topbar />

        {children}

      </div>

    </div>
  );
}