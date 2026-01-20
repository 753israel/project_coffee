import SERVER_API from "../api/serverAddress";
import { Link } from "react-router-dom";
import "./CoffeeItem.css";

function CoffeeItem({ coffee }) {
  return (
    <Link to={`/coffee/${coffee.coffee_id}`} className="coffee-item">
      <img
        src={`${SERVER_API}/static/${coffee.image}`}
        alt={coffee.name}
        className="coffee-image"
      />
      <h4 className="coffee-name">{coffee.name}</h4>
    </Link>
  );
}

export default CoffeeItem;