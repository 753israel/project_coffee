
import { useState } from "react";


function CoffeeHome(){
   
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