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
                    <p><b>Name:</b> {recipe.name}</p>
                    <img src={recipe.image} alt={recipe.name} />
                    <p><b>ID:</b> {id} <b>Health Score:</b> {recipe.health_score}</p>
                    <p><b>Description:</b></p>
                    <div className="in-text">{ ReactHtmlParser(recipe.description)}</div>
                    <p><b>Step By Step:</b></p>
                    <div className="in-text">{ ReactHtmlParser(recipe.step_by_step)}</div>
                </div>
            )}
        </div>
    );


};

export default RecipeDetail;