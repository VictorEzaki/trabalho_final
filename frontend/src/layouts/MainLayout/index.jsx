import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SidebarNav from "./../../components/SideBarNav";
import "./index.css";

function MainLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <div className="main-layout">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="header-sidebar">
          <h2 className="logo">FinanceApp</h2>

          <button
            type="button"
            className="menu-btn"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
            aria-expanded={isSidebarOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <SidebarNav isOpen={isSidebarOpen} />
      </aside>

      <main className="main-layout-content">
        <header className="main-layout-topbar">
          <button onClick={handleLogout}>Sair</button>
        </header>

        <section className="main-layout-page">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;
