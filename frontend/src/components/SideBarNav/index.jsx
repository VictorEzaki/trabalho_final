import { Link } from "react-router-dom";
import "./index.css";

function SidebarNav() {
  return (
    <nav className="sidebar-nav">
      <Link to="/home">Home</Link>
      <Link to="/expenses">Despesas</Link>
      <Link to="/categories">Categorias</Link>
    </nav>
  );
}

export default SidebarNav;