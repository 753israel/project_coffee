import { useState } from "react";
import "./CoffeeHome.css";

function CoffeeHome() {

    const coffeeList = [
        { id: 1, name: "Espresso", price: "10₪", src: "/images/espresso.jpg" },
        { id: 2, name: "Latte", price: "14₪", src: "/images/latte.jpg" },
        { id: 3, name: "Cappuccino", price: "15₪", src: "/images/cappuccino.jpg" }
    ];

    return (
        <div className="coffee-home">

            {/* Header */}
            <header className="coffee-header">
                <div className="menu">menu</div>
                <div className="titles">
                    <h1>title</h1>
                    <h3>sub title</h3>
                </div>
            </header>

            {/* About */}
            <section className="about">
                <h2>about</h2>
                <p>about text</p>
            </section>

            {/* Coffee Cards */}
            <section className="coffee-grid">
                {coffeeList.map(c => (
                    <CoffeeCard key={c.id} coffee={c} />
                ))}
            </section>

            {/* Footer */}
            <footer className="footer">
                <div>menu</div>
            </footer>

        </div>
    );
}

const CoffeeCard = ({ coffee }) => {
    return (
        <div className="coffee-card">
            <img src={coffee.src} alt={coffee.name} />
            <h3>{coffee.name}</h3>
            <div className="price">{coffee.price}</div>
        </div>
    );
};

export default CoffeeHome;