import { useEffect, useRef, useState } from "react";

const arr = [
      {id:1, name:"אמריקנו", price:14.99, src:"/Americano.jpeg"},
        {id:2, name:"אספרסו", price:18.5, src:"/Espresso.jpeg"},
        {id:3, name:"נגט", price:22.99, src:"/Latte.jpeg"},
        {id:4, name:"פלט וויט", price:25.30, src:"/FlatWhite.jpeg"},
        {id:5, name:"הוקה", price:20.99, src:"/Mocha.jpeg"},
        {id:6, name:"לאטה", price:19.99, src:"/Mikato.jpeg"},
        {id:7, name:"מיקאטו", price:21.99, src:"/Cappuccino.jpeg"},
    ]

function CoffeeSearch(){
   
    const [coffeeList, setCoffeeList] = useState([])
      
    const [text, setText] = useState("")
    const texRef = useRef(null)

    useEffect(() => {
        setCoffeeList(arr)
      
    },[])

    // <button onClick() = {search}>search</button>
    // b = document.getElementById(......)
    // b.addEventListener('click',searth)
    function search(){
       console.log(texRef.current.value);
       setText(texRef.current.value);
        
        
    }

    function filterCoffee(){
        if (text.length == 0){
            return coffeeList;
        }else{
            return coffeeList.filter((c) => c.name.includes(text))
        }
    }


   
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
                <h3>Search</h3>
                <input type="text" ref={texRef}/>
                <button onClick={search}>search</button>
            </div>
            <div>
                <h2>about</h2>
                <p>about text</p>
            </div>
                {
                    filterCoffee().map( (c)=> <CoffeeCard key={c.id} coffee={c}/>)
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
export default CoffeeSearch;