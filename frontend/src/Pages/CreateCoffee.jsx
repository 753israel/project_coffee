import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coffeeApi from "../api/coffeeApi";
import useApiStatus from "../hooks/useApiStatus";

function CreateCoffee() {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    } else {
      setIsAuthChecked(true); // עכשיו אפשר להציג את הדף
    }
  }, []);

  const [coffee, setCoffee] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const { call, error, isLoading, message, setMessage } = useApiStatus();

  const onChange = (event) => {
    const name = event.target.name;

    if (name === "image") {
      const file = event.target.files[0];
      setCoffee({ ...coffee, image: file });
    } else {
      const value = event.target.value;
      setCoffee({ ...coffee, [name]: value });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", coffee.name);
    formData.append("description", coffee.description);
    formData.append("price", coffee.price);
    formData.append("image", coffee.image);

    const response = await call({
      callbackApi: coffeeApi.createCoffee,
      data: formData,
      token: localStorage.getItem("token"),
    });

    if (response) {
      setCoffee({ name: "", description: "", price: "", image: null });
      setMessage("☕ הקפה נוסף בהצלחה");
    }
  };

  // אם עדיין לא בדקנו הרשאה — מציגים טעינה
  if (!isAuthChecked) return <h2>טוען...</h2>;

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>הוספת קפה חדש</h2>

      <div>
        <label>שם הקפה:</label>
        <input
          type="text"
          required
          name="name"
          value={coffee.name}
          onChange={onChange}
          placeholder="coffee name"
        />
      </div>

      <div>
        <label>מחיר:</label>
        <input
          type="number"
          required
          name="price"
          value={coffee.price}
          onChange={onChange}
          placeholder="Price"
          style={{ direction: "rtl" }}
        />
      </div>

      <div>
        <label>תיאור:</label>
        <textarea
          required
          name="description"
          value={coffee.description}
          onChange={onChange}
          placeholder="coffee description"
          style={{ direction: "rtl" }}
        ></textarea>
      </div>

      <div>
        <label>תמונה:</label>
        <input type="file" name="image" onChange={onChange} />
      </div>

      <br />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "טוען..." : "הוסף קפה"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </form>
  );
}

export default CreateCoffee;