import { useEffect, useRef, useState } from "react";
import CoffeeItem from "../components/CoffeeItem";
import coffeeApi from "../api/coffeeApi";

import "./CoffeeSearch.css";

function CoffeeSearch() {
  const [coffeeList, setCoffeeList] = useState([]);
  const [text, setText] = useState("");
  const texRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("אין טוקן — המשתמש לא מחובר");
      return;
    }

    coffeeApi.getAllCoffee(token)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCoffeeList(data);
        } else {
          setCoffeeList([]);
        }
      })
      .catch(err => console.error("שגיאה בקבלת הקפה מהשרת:", err));
  }, []);

  function search() {
    setText(texRef.current.value);
  }

  function filterCoffee() {
    if (text.length === 0) return coffeeList;
    return coffeeList.filter((c) => c.name.includes(text));
  }

  return (
   
    <div className="coffee-page">


      <header className="header">
        <h1>☕ ברוכים הבאים לחיפוש הקפה שלנו</h1>
        <p>מצא את הקפה המושלם בשבילך</p>
      </header>

      <section className="search-section">
        <input
          type="text"
          ref={texRef}
          placeholder="הקלד שם קפה..."
          className="search-input"
        />
        <button onClick={search} className="search-btn">חיפוש</button>
      </section>

      <section className="about-section">
        <h2>עלינו</h2>
        <p>
          אנחנו מאמינים שקפה טוב מתחיל בחוויה טובה.  
          חפש, גלה וטעם את הקפה שמתאים בדיוק לך.
        </p>
      </section>

      <section className="coffee-grid">
        {filterCoffee().map((c) => (
          <CoffeeItem key={c.coffee_id} coffee={c} />
        ))}
      </section>

      <footer className="footer">
        <p>© כל הזכויות שמורות — Coffee Racheli</p>
      </footer>

    </div>
    
  );
}

export default CoffeeSearch;