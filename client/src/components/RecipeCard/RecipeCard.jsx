import "./RecipeCard.css";
import { Link } from "react-router-dom";

const RecipeCard = ({id, name, image, diets, internalFlag}) => {
    return(
        <Link to={`/recipes/${id}`}>
            <div className="card">
                <img src={image} alt={name}/>
                <p><b>Name:</b> {name} <b>ID:</b> {id}</p>
                <p><b>Tipos De Dieta:</b>{diets && diets.map(diet => { return ` ${diet.name},` }) } </p>
                <p><b>Receta Propia:</b> {internalFlag ? 'Si' : 'No'} </p>
            </div>
        </Link>
    );
};

export default RecipeCard;