import "./RecipeCreate.css";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDiets, postRecipe } from "../../redux/actions";

const validate = (form, setErrors, errors ) => {
    console.log(form.name.length)
    if( form.name.length > 255 ) setErrors( {...errors, name: "The recipe's name is too long (max 255 chars)"} );
    else setErrors( {...errors, name: null} )
	// Name no supere la cantidad de caracteres predeterminada.
    // Image sea un link
    // Health score sea un int
    // Que health score no est debajo de 0 ni encima de 100
    // Description no supere cantidad default.
    // step by step no supere cantidad defauilt.
};

const RecipeCreate = () => {

    const diets = useSelector( (state) => state.diets );

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
        Diets: [],
	});

	const [errors, setErrors] = useState({
		name: null,
		description: null,
        health_score: null,
        step_by_step: null,
        image: null,
        Diets: null,
	});

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setForm({...form, [property]: value});
		validate( {...form, [property]: value}, setErrors, errors );
	};

    const handleChangeSelector = (event) => {
        const property = event.target.name;
		const value = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        setForm({...form, [property]: value});
		validate( {...form, [property]: value}, setErrors, errors );
    };

	const submitHandler = (event) => {
		event.preventDefault(); // Para que la pagina no se recargue.

        let countErrors = 0;
        Object.values(errors).forEach( (v) => {countErrors += v.length;} );
        if( !countErrors ) {
            console.log('entra');
            dispatch( postRecipe( form ) );
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
                    name="Diets"
                    value={form.Diets}
                    onChange={handleChangeSelector}
                >
                    {diets.map( diet => { return(<option key={diet.ID} value={diet.ID}>{diet.name}</option>) } )}
                </select>
                {errors.Diets && <p className="error">{errors.Diets}</p> }
            </div>
			<button>Create Recipe</button>
		</form>
	);
};

export default RecipeCreate;