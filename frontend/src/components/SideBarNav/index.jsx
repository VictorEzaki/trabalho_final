import { Link } from "react-router-dom";
import "./index.css";

function SidebarNav({ isOpen }) {
  return (
    <nav className={`sidebar-nav ${isOpen ? "open" : "closed"}`}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Despesas</Link>
      <Link to="/categories">Categorias</Link>
    </nav>
  );
}

export default SidebarNav;