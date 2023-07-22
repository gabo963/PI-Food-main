import RecipeCard from "./RecipeCard";
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
                recipe => { return <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} /> }
            )}
        </div>
    );
};

export default RecipeCards;