import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../contexts/AuthContext";
import SidebarNav from "./../../components/SideBarNav";
import "./index.css";

function MainLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <h2>FinanceApp</h2>
        <SidebarNav />
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