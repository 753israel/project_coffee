import { useEffect, useState } from "react";
import CoffeeItem from "../components/CoffeeItem";
import coffeeApi from "../api/coffeeApi";
import './CoffeeList.css'

function CoffeeList() {
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("אין טוקן");
      return;
    }

    coffeeApi.getAllCoffee(token)
      .then(res => res.json())
      .then(data => {
        console.log("RECEIVED DATA:", data);

        if (Array.isArray(data)) {
          setCoffeeList(data);
        } else {
          setCoffeeList([]);
        }
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
   
    <div className="coffee-list">
      {coffeeList.map(c => (
        <CoffeeItem key={c.coffee_id} coffee={c} />
      ))}
    </div>
   
  );
}

export default CoffeeList;