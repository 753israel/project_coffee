import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <nav className="menu">
      <Link to="/" className="menu-logo">
        <img src="/coffee_logo.png" alt="logo" />
      </Link>

      <ul className="menu-links">
        <li><Link to="/coffee">הקפה שלנו</Link></li>
        <li><Link to="/search">חיפוש קפה</Link></li>
        <li><Link to="/coffee/new">הוספת קפה</Link></li>
        <li><Link to="/login">כניסה</Link></li>
        <li><Link to="/register">רישום</Link></li>
        <li><Link to="/logout">יציאה</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;