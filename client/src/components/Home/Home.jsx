import './Home.css';

import RecipeCard from '../RecipeCard/RecipeCard';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { useState } from "react";
import Pagination from '../Pagination/Pagination';

const Home = () => {

    const recipes = useSelector( (state) => state.recipes );
    const errorsRecipes = useSelector( (state) => state.errors.getRecipesErrors );
    const errorsDiets = useSelector( (state) => state.errors.getDietsErrors );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getRecipes() );
    }, [] );

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const ultimoIndex = currentPage * postsPerPage;
    const primerIndex = ultimoIndex - postsPerPage;
    const cards = recipes.slice(primerIndex, ultimoIndex);
        
    return(
        <div className='container'>

            {errorsRecipes !== "" ? <p className="error">{errorsRecipes}</p> : ""}
            {errorsDiets !== "" ? <p className="error">{errorsDiets}</p> : ""}

            <h3>Recipes:</h3>
            {/* Falta la search bar, el paginado, y los filtros. */}

            <div className='container'>
                <input type="search" name="search" placeholder='Search...' className='icon'/>
            </div>

            <div className='cards'>
                {cards && cards.map(
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

            <Pagination totalPosts={recipes.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>

        </div>
    );
};

export default Home;