
import { Link } from "react-router-dom";

  

function CoffeeItem({coffee}){
    
     return(
       <Link to={`/coffee/${coffee.coffeeId}`}>
            <h4>{coffee.name}</h4>
            <img src={coffee.image} alt={coffee.name} style={{ width: '200px' }}/>
       </Link>
     )

}

export default CoffeeItem;