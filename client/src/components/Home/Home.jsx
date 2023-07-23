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
        <div className='container'>
            <h3>Recipes:</h3>
            {/* Falta la search bar, el paginado, y los filtros. */}

            <div className='cards'>
                {recipes.map(
                    recipe => { return <RecipeCard 
                        key={`${recipe.ID}-${recipe.internalFlag}`} 
                        id={`${recipe.ID}-${recipe.internalFlag}`} 
                        name={recipe.name} 
                        image={recipe.image}
                        diets={recipe.Diets}
                        internalFlag={recipe.internalFlag}    
                    /> }
                )}
            </div>
        </div>
    );
};

export default Home;