import { Link } from "react-router-dom";
import "./Layout.css";

function Menu() {
  // נקרא את המשתמש ששמרנו בלוגין
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="menu">
      <Link to="/" className="menu-logo">
        <img src="/coffee_logo.png" alt="logo" />
      </Link>

      <ul className="menu-links">

        {/* --- משתמש לא מחובר --- */}
        {!user && (
          <>
            <li><Link to="/login">כניסה</Link></li>
            <li><Link to="/register">רישום</Link></li>
          </>
        )}

        {/* --- משתמש רגיל --- */}
        {user && user.role === "regular" && (
          <>
            <li><Link to="/coffee">הקפה שלנו</Link></li>
            <li><Link to="/search">חיפוש קפה</Link></li>
            <li><Link to="/logout">יציאה</Link></li>
          </>
        )}

        {/* --- מנהל --- */}
        {user && user.role === "admin" && (
          <>
            <li><Link to="/coffee">רשימת הקפה</Link></li>
            <li><Link to="/coffee/new">הוספת קפה</Link></li>
            <li><Link to="/logout">יציאה</Link></li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Menu;