import "./RecipeCreate.css";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDiets, postRecipe } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const validate = (form, errors ) => {

    if( form.name.length === 0 ) errors = {...errors, name: "The Name is empty."};
    else {
        if( form.name.length > 255 ) errors = {...errors, name: "The recipe's name is too long (max 255 chars)"};
        else errors = {...errors, name: ''};
    }

    if( !Number.isInteger( Number(form.health_score) ) ) errors = {...errors, health_score: "The Health Score should be an integer."};
    else {
        if( Number(form.health_score) < 0 || Number(form.health_score) > 100  ) errors = {...errors, health_score: "The Health Score should be less than 100, and more than 0."};
        else {
            if( form.health_score == '' ) errors = { ...errors, health_score: 'The Health Score is empty' }
            else errors = {...errors, health_score: ''};
        };
    }

    if( form.description.length === 0 ) errors = {...errors, description: "The Description is empty."};
    else {
        if( form.description.length > 2048 ) errors = {...errors, description: "The recipe's description is too long (max 2048 chars)"};
        else errors = {...errors, description: ''};
    }

    if( form.step_by_step.length === 0 ) errors = {...errors, step_by_step: "The Step by Step instructions are empty."};
    else {
        if( form.step_by_step.length > 2048 ) errors = {...errors, step_by_step: "The recipe's Step by Step instructions is too long (max 2048 chars)"};
        else errors = {...errors, step_by_step: ''};
    }

    if( form.image.length === 0 ) errors = {...errors, image: "The image is empty."};
    else {
        if( form.image.length > 2048 ) errors = {...errors, image: "The image is too long (max 2048 chars)"};
        else errors = {...errors, image: ''};
    }

    return errors;
};

const RecipeCreate = () => {

    const diets = useSelector( (state) => state.diets );
    const errorsApi = useSelector( (state) => state.errors.postRecipeErrors );
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getDiets() );
    }, [] );

	const [form, setForm] = useState({
		name: "",
		description: "",
        health_score: 0,
        step_by_step: "",
        image: "",
        diets: [],
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
        health_score: '',
        step_by_step: '',
        image: '',
        diets: '',
	});

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setForm({...form, [property]: value});
		setErrors( validate( {...form, [property]: value}, errors ));
	};

    const handleChangeSelector = (event) => {
        const property = event.target.name;
		const value = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        setForm({...form, [property]: value});
		setErrors( validate( {...form, [property]: value}, errors ));
    };

	const submitHandler = (event) => {
		event.preventDefault(); // Para que la pagina no se recargue.

        let countErrors = 0;
        Object.values(errors).forEach( (v) => {countErrors += v.length;} );
        if( !countErrors ) {
            let recipe = {...form};
            recipe = {...recipe, health_score: parseInt(recipe.health_score)};
            const {name, description, health_score, step_by_step, image, diets} = recipe;  
            dispatch( postRecipe( {name, description, health_score, step_by_step, image, diets} ) );
            if( errorsApi !== "" ) {
                navigate('/recipes');
            }
            console.log(errorsApi);
        }
	};

	return (
		<form onSubmit={submitHandler}>
            <h2>Create a New Recipe</h2>
			<div className="container">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p> }
            </div>
            <div className="container">
                <div className="container">
                    <label htmlFor="description">Description:</label>
                </div>
                <textarea className="bigText"
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
                {errors.description && <p className="error">{errors.description}</p> }
			</div>
            <div className="container">
                <label htmlFor="health_score">Health Score:</label>
                <input
                    type="number"
                    name="health_score"
                    min={0}
                    max={100}
                    value={form.health_score}
                    onChange={handleChange}
                />
                {errors.health_score && <p className="error">{errors.health_score}</p> }
            </div>
            <div className="container">
                <div className="container">
                    <label htmlFor="step_by_step">Step by Step:</label>
                </div>
                <textarea className="bigText"
                    type="text"
                    name="step_by_step"
                    value={form.step_by_step}
                    onChange={handleChange}
                />
                {errors.step_by_step && <p className="error">{errors.step_by_step}</p> }
            </div>
            <div className="container">
                <label htmlFor="image">Image URL:</label>
                <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                />
                {errors.image && <p className="error">{errors.image}</p> }
                <p>{form.image != "" ? <img src={form.image} alt='ImageTest'/> : ''}</p>
            </div>
            <div className="container">
                <div className="container">
                    <label htmlFor="Diets">Diet Types:</label>
                </div>
                <select 
                    multiple={true}
                    name="diets"
                    value={form.diets}
                    onChange={handleChangeSelector}
                >
                    {diets && diets.map( diet => { return(<option key={diet.ID} value={diet.ID}>{diet.name}</option>) } )}
                </select>
                {errors.diets && <p className="error">{errors.diets}</p> }
            </div>
            <div className="container">
                {errorsApi !== "" ? <p className="error">{errorsApi}</p> : ""}
                <button>Create Recipe</button>
            </div>
		</form>
	);
};

export default RecipeCreate;