import { useCart } from "../context/CartContext";

export default function MenuPage() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "אספרסו קצר", price: 10, image: "/coffee/espresso.jpeg" },
    { id: 2, name: "אספרסו ארוך", price: 12, image: "/coffee/long_espresso.jpeg" },
    { id: 3, name: "קפוצ'ינו", price: 15, image: "/coffee/cappuccino.jpeg" },
    { id: 4, name: "לאטה", price: 16, image: "/coffee/latte.jpeg" },
    { id: 5, name: "אמריקנו", price: 14, image: "/coffee/americano.jpeg" }
  ];

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>תפריט הקפה</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {products.map(item => (
          <div key={item.id} style={{
            background: "#2d2d2d",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <img 
              src={item.image}
              alt={item.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h3>{item.name}</h3>
            <p>{item.price} ₪</p>

            <button
              onClick={() => addToCart(item)}
              style={{
                background: "#d4a373",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              הוסף לעגלה
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}