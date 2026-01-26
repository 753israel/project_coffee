import { useEffect, useState } from "react";
import orderApi from "../api/orderApi";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?.user_id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    orderApi
      .getOrdersByUser(userId, token)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) return <p>טוען...</p>;
  if (!userId) return <p>עליך להתחבר.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>ההזמנות שלי</h1>

      {orders.length === 0 && <p>אין הזמנות.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {orders.map(order => (
          <div
            key={order.order_id}
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "center"
            }}
          >
            {/* תמונה */}
            {order.coffee?.image && (
              <img
                src={`http://localhost:5000/static/${order.coffee.image}`}
                alt={order.coffee.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />
            )}

            {/* תוכן הכרטיס */}
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>
                {order.coffee?.name}
              </h3>

              

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  marginBottom: "5px"
                }}
              >
                {order.price} ₪
              </p>

              <p style={{ fontSize: "12px", color: "#888" }}>
                {order.created_at}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;