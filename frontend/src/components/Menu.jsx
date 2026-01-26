import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import CartIcon from "./CartIcon";
import "./Layout.css";

function Menu() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useCart();

  // סופרים כמה פריטים יש בעגלה
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="menu-bar">

      {/* עגלה בצד ימין */}
      <div className="menu-section right">
        {user?.role === "regular" && (
          <Link to="/cart" className="cart-link">
            <CartIcon />

            {/* מספר פריטים בעגלה */}
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        )}
      </div>

      {/* קישורים במרכז */}
      <div className="menu-section center">
        <ul className="menu-links">
          {!user && (
            <>
              <li><Link to="/login">כניסה</Link></li>
              <li><Link to="/register">רישום</Link></li>
            </>
          )}

          {user?.role === "regular" && (
            <>
              <li><Link to="/">בית</Link></li>
              <li><Link to="/coffee">הקפה שלנו</Link></li>
              <li><Link to="/menu">תפריט</Link></li>
              <li><Link to="/orders">ההזמנות שלי</Link></li>
              <li><Link to="/logout">יציאה</Link></li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li><Link to="/coffee">רשימת הקפה</Link></li>
              <li><Link to="/coffee/new">הוספת קפה</Link></li>
              <li><Link to="/orders">ההזמנות שלי</Link></li>
              <li><Link to="/logout">יציאה</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* לוגו בצד שמאל */}
      <div className="menu-section left">
        <Link to="/" className="menu-logo">
          <img src="/coffee_logo.png" alt="logo" />
        </Link>
      </div>

    </nav>
  );
}

export default Menu;