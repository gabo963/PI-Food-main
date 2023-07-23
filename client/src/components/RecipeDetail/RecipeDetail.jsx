import "./RecipeDetail.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipe } from "../../redux/actions";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';

const RecipeDetail = () => {

    const { id } = useParams();

    const recipe = useSelector( (state) => state.recipe );
    const dispatch = useDispatch();

    useEffect( ()=>{
        dispatch( getRecipe( id ));
    }, []);

    return(
        <div>
            {recipe && (
                <div>
                    <h1>{recipe.name}</h1>
                    <img src={recipe.image} alt={recipe.name} />
                    <p><b>ID:</b> {id} <b>Health Score:</b> {recipe.health_score}</p>
                    <h3>Diet Types :</h3>
                    <p>{recipe.Diets.map(diet => { return ` ${diet.name},` }).join('').slice(0,-1) + '.'}</p>
                    <h3>Description:</h3>
                    <div className="in-text">{ ReactHtmlParser(recipe.description)}</div>
                    <h3>Step By Step:</h3>
                    <div className="in-text">{ ReactHtmlParser(recipe.step_by_step)}</div>
                </div>
            )}
        </div>
    );


};

export default RecipeDetail;