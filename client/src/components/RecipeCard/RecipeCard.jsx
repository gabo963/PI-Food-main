import "./RecipeCard.css";
import { Link } from "react-router-dom";

const RecipeCard = ({id, name, image, diets, internalFlag}) => {
    return(
        <Link to={`/recipes/${id}`}>
            <div className="card">
                <img src={image} alt={name}/>
                <p><b>Name:</b> {name} <b>ID:</b> {id}</p>
                <p><b>Diet Types:</b>{diets && diets.map(diet => { return ` ${diet.name},` }).join('').slice(0,-1) + '.' } </p>
                <p><b>My Recipe:</b> {internalFlag ? 'Yes' : 'No'} </p>
            </div>
        </Link>
    );
};

export default RecipeCard;