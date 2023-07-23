import "./RecipeDetail.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipe } from "../../redux/actions";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {

    const { id } = useParams();

    const recipe = useSelector( (state) => state.recipe );
    const dispatch = useDispatch();

    useEffect( ()=>{
        dispatch( getRecipe( id ));
    }, []);

    return(
        <div>
            <p><b>Name:</b> {recipe && recipe.name} </p>
        </div>
    );


};

export default RecipeDetail;