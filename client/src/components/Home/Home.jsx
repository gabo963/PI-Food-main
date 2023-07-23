import './Home.css';

import RecipeCard from '../RecipeCard/RecipeCard';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";


const Home = () => {

    const recipes = useSelector( (state) => state.recipes );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getRecipes() );
    }, [] );

    return(
        <div>
            <h3>Recipes:</h3>
            <div>
                {recipes.map(
                    recipe => { return <RecipeCard 
                        key={recipe.ID} 
                        id={recipe.ID} 
                        name={recipe.name} 
                        image={recipe.image} /> }
                )}
            </div>
        </div>
    );
};

export default Home;