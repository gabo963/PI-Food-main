import RecipeCard from "./RecipeCard/RecipeCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../redux/actions";

const RecipeCards = (props) => {

    const recipes = useSelector( (state) => state.recipes );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getRecipes() );
    }, [] );

    return (
        <div>
            {recipes.map(
                recipe => { return <RecipeCard key={recipe.ID} id={recipe.ID} name={recipe.name} image={recipe.image} /> }
            )}
        </div>
    );
};

export default RecipeCards;