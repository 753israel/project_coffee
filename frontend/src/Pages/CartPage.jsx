console.log("CartPage loaded");
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, addToCart, decreaseQty, removeFromCart, total } = useCart();

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>העגלה שלי</h1>

      {cart.length === 0 && <p>העגלה ריקה</p>}

      {cart.map(item => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#333",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <div>
            <h3>{item.name}</h3>
            <p>מחיר: {item.price} ₪</p>
            <p>כמות: {item.qty}</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>הסר</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <h2>סה״כ לתשלום: {total} ₪</h2>
      )}
    </div>
  );
}