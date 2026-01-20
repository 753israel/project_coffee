import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/">הקפה שלנו</Link>
        <Link to="/search">חיפוש קפה</Link>
        <Link to="/coffee/new">הוספת קפה</Link>
        <Link to="/login">כניסה</Link>
        <Link to="/register">רישום</Link>
        <Link to="/logout">יציאה</Link>
      </nav>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;