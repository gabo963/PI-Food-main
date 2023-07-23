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

            <div className='cards'>
                {recipes.map(
                    recipe => { return <RecipeCard 
                        key={recipe.ID} 
                        id={recipe.ID} 
                        name={recipe.name} 
                        image={recipe.image}
                        tiposDeDieta={recipe.diets}
                        internalFlag={recipe.internalFlag}    
                    /> }
                )}
            </div>
        </div>
    );
};

export default Home;