import SERVER_API from "../api/serverAddress";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import coffeeApi from "../api/coffeeApi";
import "./CoffeePage.css";

function CoffeePage() {
  const { coffeeId } = useParams();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoffee() {
      try {
        const token = localStorage.getItem("token");
        const res = await coffeeApi.getCoffeeById(coffeeId, token);
        const data = await res.json();
        setCoffee(data);
      } catch (err) {
        console.error("שגיאה בטעינת הקפה:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCoffee();
  }, [coffeeId]);

  if (loading) return <h2>טוען...</h2>;
  if (!coffee) return <h2>לא נמצא קפה</h2>;

  console.log("coffee:", coffee);

  return (
    <div className="coffee-page">
      <h2>{coffee.name}</h2>
      <p>{coffee.description}</p>

      <img
        src={`${SERVER_API}/static/${coffee.image}`}
        alt={coffee.name}
        className="coffee-image"
      />

      <h3 className="coffee-price">{coffee.price} ₪</h3>
    </div>
  );
}

export default CoffeePage;