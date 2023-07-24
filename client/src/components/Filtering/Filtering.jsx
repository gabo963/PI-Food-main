import "./Filtering.css";

import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { useState } from "react";

const Filtering = () => {

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    return (
        <div className='container'>
            <input type="search" name="search" placeholder='Search...' className='icon' onChange={ (event) => setSearch(event.target.value) }/>
            <button onClick={()=>{dispatch( getRecipes(search) )}}>Search</button>
        </div> 
    )
};

export default Filtering;