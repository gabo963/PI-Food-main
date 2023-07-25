import "./Filtering.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { getRecipes, getDiets, filterRecipes, resetFilterRecipes } from "../../redux/actions";

const Filtering = () => {

    const [search, setSearch] = useState('');
    const [selectedDiets, setDiets] = useState([]);
    const diets = useSelector( (state) => state.diets );

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getDiets() );
    }, [] );

    useEffect( () => {
        dispatch( filterRecipes( {
            name: "Diets",
            field: 'ID',
            value: selectedDiets
        } ) );
    }, [selectedDiets] );

    const changeDiets = (event) => {
        const values = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        setDiets(values);
    };

    return (
        <div className='container'>
            <div className='container'>
                <input type="search" name="search" placeholder='Search...' className='icon' onChange={ (event) => setSearch(event.target.value) }/>
                <button className="boton" onClick={()=>{dispatch( getRecipes(search) )}}>Search</button>
            </div> 
            <div className="container">
                    <select  multiple={true} name="diets" value={selectedDiets} onChange={changeDiets}>
                        {diets && diets.map( diet => { return(<option key={diet.ID} value={diet.ID}>{diet.name}</option>) } )}
                    </select>
                    <button className="boton" onClick={()=>{dispatch( resetFilterRecipes() )}}>Reset</button>
            </div>
        </div>
    )
};

export default Filtering;