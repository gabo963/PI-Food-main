import "./RecipeCreate.css";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDiets } from "../../redux/actions";

const validate = (form, setErrors, errors ) => {
	// Name no supere la cantidad de caracteres predeterminada.
    // Image sea un link
    // Health score sea un int
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
		name: "",
		description: "",
        health_score: "",
        step_by_step: "",
        image: "",
        Diets: "",
	});

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setForm({...form, [property]: value});
		validate( {...form, [property]: value}, setErrors, errors );
	};

	const submitHandler = (event) => {
		event.preventDefault(); // Para que la pagina no se recargue.
        // Acciones para hacer los cambios.
	};

	return (
		<form onSubmit={submitHandler}>
            <h3>Create a New Recipe</h3>
			<div className="container">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className="container">
                <label htmlFor="description">Description:</label>
                <input className="bigText"
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
			</div>
            <div className="container">
                <label htmlFor="health_score">Health Score:</label>
                <input
                    type="number"
                    name="health_score"
                    value={form.health_score}
                    onChange={handleChange}
                />
            </div>
            <div className="container">
                <label htmlFor="step_by_step">Step by Step:</label>
                <input className="bigText"
                    type="text"
                    name="step_by_step"
                    value={form.step_by_step}
                    onChange={handleChange}
                />
            </div>
            <div className="container">
                <label htmlFor="image">Image URL:</label>
                <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                />
                <p>{form.image != "" ? <img src={form.image} alt='ImageTest'/> : ''}</p>
            </div>
            <div className="container">
                <label htmlFor="name">Diet Types:</label>
                <select 
                    multiple={true}
                    name="Diets"
                    onChange={handleChange}
                >
                    {diets.map( diet => { return(<option value={diet.ID}>{diet.name}</option>) } )}
                </select>
            </div>
			<button>Login</button>
		</form>
	);
};

export default RecipeCreate;