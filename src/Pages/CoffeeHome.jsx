
import { useState } from "react";


function CoffeeHome(){
    // כאשר מקבלים רשימה מהשרת
    // עוברים על הרשימה באמצאות map
    // כדי להציג כל איבר ברשימה 
    const [coffeeList, setCoffeeList] = useState([
        {id:1, name:"אמריקנו", price:14.99, src:"/Americano.jpeg"},
        {id:2, name:"אספרסו", price:18.5, src:"/Espresso.jpeg"},
        {id:3, name:"נוגט", price:22.99, src:"/Latte.jpeg"},
        {id:4, name:"נס על חלב ", price:25.30, src:"/FlatWhite.jpeg"},
        {id:5, name:"הוקה", price:20.99, src:"/Mocha.jpeg"},
        {id:6, name:"לאטה", price:19.99, src:"/Mikato.jpeg"},
        {id:7, name:"מיקאטו", price:21.99, src:"/Cappuccino.jpeg"},
    ]);



    return(
        <div>
            <div>
                <div>menu</div>
                <div>
                    <h1>title</h1>
                    <h3>sub title</h3>
                </div>
            </div>
            <div>
                <h2>about</h2>
                <p>about text</p>
            </div>
                {
                    coffeeList.map( (c)=> <CoffeeCard key={c.id} coffee={c}/>)
                }
            <div>
                <div>menu</div>
            </div>
        </div>
    
        
    )
}
const CoffeeCard = ({coffee}) => {
    return(
        <div key={coffee.id}>
            <img style={{width:'30%'}} src={coffee.src} alt={coffee.name}/>
            <p>{coffee.name}</p>
            <div>
                <span>{coffee.price}</span>
            </div>
        </div>
    )
}
export default CoffeeHome;