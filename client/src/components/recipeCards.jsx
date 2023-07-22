import RecipeCard from "./RecipeCard";
import { useSelector} from "react-redux";

const RecipeCards = (props) => {

    const recipes = useSelector( (state) => state.recipes );

    return (
        <div>
            {recipes.map(
                recipe => { return <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} /> }
            )}
        </div>
    );
};

export default RecipeCards;