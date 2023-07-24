import "./Filtering.css";

import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { useState } from "react";

const Filtering = () => {

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    return (
        <div className='container'>
            <div className='container'>
                <input type="search" name="search" placeholder='Search...' className='icon' onChange={ (event) => setSearch(event.target.value) }/>
                <button className="boton" onClick={()=>{dispatch( getRecipes(search) )}}>Search</button>
            </div> 
            <div className="container">
                {/* Filtering and ordering */}
            </div>
        </div>
    )
};

export default Filtering;