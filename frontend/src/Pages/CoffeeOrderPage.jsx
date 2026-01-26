import { useEffect, useState } from "react";
import coffeeApi from "../api/coffeeApi";
import orderApi from "../api/orderApi";

export default function CoffeeOrderPage() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?.user_id;

  useEffect(() => {
    coffeeApi
      .getAllCoffee(token)
      .then(res => res.json())
      .then(data => {
        setCoffees(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading coffees:", err);
        setLoading(false);
      });
  }, []);

 const handleOrder = (coffeeId) => {
  if (!userId) {
    setMessage("עליך להתחבר כדי להזמין.");
    return;
  }

  orderApi
    .createOrder({
      coffeeId,
      token,
      data: { user_id: userId }
    })
    .then(async res => {
      const text = await res.text();
      console.log("SERVER RESPONSE:", text); // ← זה מה שחשוב עכשיו
    })
    .catch(err => {
      console.error("Order error:", err);
      setMessage("שגיאה בהזמנה.");
    });
};
  if (loading) return <p>טוען קפה...</p>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#f5f5f5",
        minHeight: "100vh",
        borderRadius: "10px"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px",color:"brown" }}>הזמנת קפה</h1>

      {message && (
        <p
          style={{
            color: "green",
            background: "#e8ffe8",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          {message}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          justifyItems: "center"
        }}
      >
        {coffees.map(coffee => (
          <div
            key={coffee.coffee_id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              width: "220px",
              textAlign: "center"
            }}
          >
            {/* שם הקפה */}
            <h3 style={{ margin: "5px 0", fontSize: "18px", color: "#222" }}>
              {coffee.name}
            </h3>

            {/* תמונה */}
            {coffee.image && (
              <img
                src={`http://localhost:5000/static/${coffee.image}`}
                alt={coffee.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              />
            )}

            

            {/* מחיר — מתחת לתיאור */}
            <p
              style={{
                fontWeight: "bold",
                margin: "10px 0 5px 0",
                fontSize: "18px",
                color: "#000"
              }}
            >
              מחיר: {coffee.price} ₪
            </p>

            {/* כפתור */}
            <button
              onClick={() => handleOrder(coffee.coffee_id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%"
              }}
            >
              הזמן עכשיו
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}