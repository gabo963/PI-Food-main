import "./Filtering.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { getRecipes, getDiets, filterRecipes, resetFilterRecipes } from "../../redux/actions";

const Filtering = () => {

    const [search, setSearch] = useState('');
    const [selectedDiets, setDiets] = useState([]);
    const [selectedFlag, setFlag] = useState(undefined);
    const diets = useSelector( (state) => state.diets );

    const dispatch = useDispatch();

    const flags = [ {ID: 0, name: 'Own Recipe', value: 1}, {ID: 1, name: 'External Recipe', value: 0} ];

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

    useEffect( () => {
        dispatch( filterRecipes( {
            name: "internalFlag",
            field: '',
            value: selectedFlag
        } ) );
    }, [selectedFlag] );

    const changeDiets = (event) => {
        const values = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        setDiets(values);
    };

    const changeFlag = (event) => {
        const value = event.target.value;
        setFlag(value);
    };

    return (
        <div className='container'>
            <div className='container'>
                <input type="search" name="search" placeholder='Search...' className='icon' onChange={ (event) => setSearch(event.target.value) }/>
                <button className="boton" onClick={()=>{dispatch( getRecipes(search) )}}>Search</button>
            </div>
            <h3>Selection:</h3>
            <div className="varios">
                <div className="varios">
                    <p><b>Filters:</b></p>
                    <select className="objects" multiple={true} name="diets" value={selectedDiets} onChange={changeDiets}>
                        {diets && diets.map( diet => { return(<option key={diet.ID} value={diet.ID}>{diet.name}</option>) } )}
                    </select>
                    <select className="objects" multiple={false} name="internalFlag" value={selectedFlag} onChange={changeFlag}>
                        {flags && flags.map( flag => { return(<option key={flag.ID} value={flag.value}>{flag.name}</option>) } )}
                    </select>
                </div>
                <div className="varios">
                    <p><b>Ordering:</b></p>
                    <select className="objects" multiple={true} name="diets" value={selectedDiets} onChange={changeDiets}>
                        {diets && diets.map( diet => { return(<option key={diet.ID} value={diet.ID}>{diet.name}</option>) } )}
                    </select>
                    <select className="objects" multiple={false} name="internalFlag" value={selectedFlag} onChange={changeFlag}>
                        {flags && flags.map( flag => { return(<option key={flag.ID} value={flag.value}>{flag.name}</option>) } )}
                    </select>
                    <button className="boton" onClick={()=>{dispatch( resetFilterRecipes() )}}>Reset</button>
                </div>
            </div>
        </div>
    )
};

export default Filtering;