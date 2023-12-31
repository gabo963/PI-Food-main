import './Home.css';

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from '../Pagination/Pagination';
import Filtering from '../Filtering/Filtering'

const Home = () => {

    const recipes = useSelector( (state) => state.recipes );
    const filteredRecipes = useSelector( (state) => state.filteredRecipes );
    const match = useSelector( (state) => state.match );
    const errorsRecipes = useSelector( (state) => state.errors.getRecipesErrors );
    const errorsDiets = useSelector( (state) => state.errors.getDietsErrors );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let cards = [];

    useEffect( () => {
        dispatch( getRecipes() );
    }, [] );

    useEffect( () => {
        cards = recipes.slice(primerIndex, ultimoIndex);
        if( match ) {
            const receta = recipes.filter( recipe => recipe.exactMatch )
            navigate(`/recipes/${receta[0].ID}-${receta[0].internalFlag}`);
        }
    }, [recipes, match] );

    useEffect( () => {
        cards = filteredRecipes.slice(primerIndex, ultimoIndex);
    }, [filteredRecipes] );

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const ultimoIndex = currentPage * postsPerPage;
    const primerIndex = ultimoIndex - postsPerPage;
    cards = filteredRecipes.length ? filteredRecipes.slice(primerIndex, ultimoIndex) : recipes.slice(primerIndex, ultimoIndex);
        
    return(
        <div className='container'>

            {errorsRecipes !== "" ? <p className="error">{errorsRecipes}</p> : ""}
            {errorsDiets !== "" ? <p className="error">{errorsDiets}</p> : ""}

            <h2>Recipes:</h2>
            <Filtering />

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
            
            <Pagination totalPosts={filteredRecipes.length ? filteredRecipes.length : recipes.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
        </div>
    );
};

export default Home;