import { useEffect, useRef, useState } from "react";
import CoffeeItem from "../components/CoffeeItem";

const coffeeListDemo = [
     {coffeeId:1, name:"אמריקנו", description:"...", price:14.99, image:"/Americano.jpeg"},
     {coffeeId:2, name:"אספרסו", description:"...", price:18.5, image:"/Espresso.jpeg"},
     {coffeeId:3, name:"נוגט", description:"...", price:22.99, image:"/Latte.jpeg"},
     {coffeeId:4, name:"נס על חלב", description:"...", price:25.30, image:"/FlatWhite.jpeg"},
     {coffeeId:5, name:"הוקה", description:"...", price:20.99, image:"/Mocha.jpeg"},
     {coffeeId:6, name:"לאטה", description:"...", price:19.99, image:"/Mikato.jpeg"},
     {coffeeId:7, name:"מיקאטו", description:"...", price:21.99, image:"/Cappuccino.jpeg"},
    ]

function CoffeeSearch(){
   
    const [coffeeList, setCoffeeList] = useState([])
    const [text, setText] = useState("")
    const texRef = useRef(null)

    useEffect(() => {
        setCoffeeList(coffeeListDemo)
      
    },[])

    // <button onClick() = {search}>search</button>
    // b = document.getElementById(......)
    // b.addEventListener('click',searth)
    function search(){
       console.log(texRef.current.value);
       setText(texRef.current.value);
        
        
    }

    function filterCoffee(){
        if (text.length == 0 ){
            return coffeeList;
        }else{
            return coffeeList.filter((c) => c.name.includes(text))
        }
    }


   
    return(
        <div>
            <div>
               
                <div>
                    <h1>ברוכים הבאים לחיפוש הקפה שלנו</h1>
                </div>
            </div>
            <div>
                <h3>Search</h3>
                <input type="text" ref={texRef}/>
                <button onClick={search}>search</button>
            </div>
            <div>
                <h2>about</h2>
                <p>about text</p>
            </div>
                {
                    filterCoffee().map( (c)=> <CoffeeItem key={c.id} coffee={c}/>)
                }
            <div>
                <div>menu</div>
            </div>
        </div>
    
        
    )
}


export default CoffeeSearch;