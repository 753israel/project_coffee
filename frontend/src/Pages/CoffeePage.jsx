import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const coffeeListDemo = [
  {coffeeId:1, name:"אמריקנו", description:"...", price:14.99, image:"/Americano.jpeg"},
  {coffeeId:2, name:"אספרסו", description:"...", price:18.5, image:"/Espresso.jpeg"},
  {coffeeId:3, name:"נוגט", description:"...", price:22.99, image:"/Latte.jpeg"},
  {coffeeId:4, name:"נס על חלב", description:"...", price:25.30, image:"/FlatWhite.jpeg"},
  {coffeeId:5, name:"הוקה", description:"...", price:20.99, image:"/Mocha.jpeg"},
  {coffeeId:6, name:"לאטה", description:"...", price:19.99, image:"/Mikato.jpeg"},
  {coffeeId:7, name:"מיקאטו", description:"...", price:21.99, image:"/Cappuccino.jpeg"},
];

function CoffeePage() {
  const [coffee, setCoffee] = useState(null);
  const params = useParams();

  useEffect(() => {
    const id = Number(params.coffeeId);
    const found = coffeeListDemo.find(c => c.coffeeId === id);
    setCoffee(found);
    console.log(id)
  }, []);

  if (!coffee) return <h2>טוען...</h2>;

  return (
    <div>
      <h2>{coffee.name}</h2>
      <p>{coffee.description}</p>
      <img src={coffee.image} alt={coffee.name} style={{ width: '200px' }} />
      <br />
      <code>{coffee.price}</code>
    </div>
  );
}

export default CoffeePage;