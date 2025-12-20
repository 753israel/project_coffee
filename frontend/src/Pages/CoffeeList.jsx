import { useEffect, useState } from "react";
import CoffeeItem from "../components/CoffeeItem";
    
       // כאשר מקבלים רשימה מהשרת
       // עוברים על הרשימה באמצאות map
       // כדי להציג כל איבר ברשימה 
  
      const coffeeListDemo = [
          {coffeeId:1, name:"אמריקנו",description:"קפה אמריקנו הוא משקה קפה איטלקי פופולרי המורכב מ-אספרסו (מנה אחת או שתיים) בתוספת מים חמים, שמטרתו לדלל את טעם האספרסו החזק ולהפוך אותו דומה יותר לקפה פילטר, אך עם טעם אספרסו ייחודי; הוא מוגש בדרך כלל ללא חלב, כדי לשמר את טעמי הקפה המקוריים, וניתן להוסיף לו מעט חלב לפי הטעם. ", price:14.99, image:"/Americano.jpeg"},
          {coffeeId:2, name:"אספרסו",description:"", price:18.5, image:"/Espresso.jpeg"},
          {coffeeId:3, name:"נוגט",description:"", price:22.99, image:"/Latte.jpeg"},
          {coffeeId:4, name:"נס על חלב ",description:"", price:25.30, image:"/FlatWhite.jpeg"},
          {coffeeId:5, name:"הוקה",description:"", price:20.99, image:"/Mocha.jpeg"},
          {coffeeId:6, name:"לאטה",description:"", price:19.99, image:"/Mikato.jpeg"},
          {coffeeId:7, name:"מיקאטו",description:"", price:21.99, image:"/Cappuccino.jpeg"},
      ]

function CoffeeList(){
    const [coffeeList, setCoffeeList] = useState([])

    const loadCoffee = () =>{
        setCoffeeList(coffeeListDemo)
    }

    useEffect(() => {
        loadCoffee();
    }, [])

    return(
        <div>
           {
                coffeeList.map( (c) => <CoffeeItem key={c.coffeeId} coffee={c}/>)
           }
        </div>
    )

}

export default CoffeeList