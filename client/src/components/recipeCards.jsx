import { useDispatch, useSelector} from "react-redux";
import recipeCard from "./recipeCard,jsx";

const recipeCards = (props) => {
    return (
        <div>
            {recipes.map(
                recipe => { return <recipeCard key={recipe.id} name={recipe.name} /> }
            )}
        </div>
    );
};

export default recipeCards;