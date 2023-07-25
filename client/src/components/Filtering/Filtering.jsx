import "./Filtering.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { getRecipes, getDiets, filterRecipes, resetRecipes } from "../../redux/actions";

const Filtering = () => {

    const [search, setSearch] = useState('');
    const [selectedDiets, setDiets] = useState([]);
    const [selectedFlag, setFlag] = useState(undefined);
    const [selectedOrderMethod, setOrderMethod] = useState('');
    const [selectedOrder, setOrder] = useState('ascending');
    const diets = useSelector( (state) => state.diets );

    const dispatch = useDispatch();

    const flags = [ {ID: 0, name: 'Own Recipe', value: 1}, {ID: 1, name: 'External Recipe', value: 0} ];
    const orderMethod = [ {ID: 0, name: 'Health Score'}, {ID: 1, name: 'Alphabetical'} ];
    const orders = [ {ID: 0, name: 'ascending'}, {ID: 1, name: 'descending'} ];

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

    useEffect( () => {
        
    }, [selectedOrderMethod] );

    useEffect( () => {
        
    }, [selectedOrder] );

    const changeDiets = (event) => {
        const values = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        setDiets(values);
    };

    const changeFlag = (event) => {
        const value = event.target.value;
        setFlag(value);
    };

    const changeOrder = (event) => {
        const value = event.target.value;
        setOrder(value);
    };

    const changeOrderMethod = (event) => {
        const value = event.target.value;
        setOrderMethod(value);
    };

    return (
        <div className='containerFilter'>
            <div className='containerFilter'>
                <input type="search" name="search" placeholder='Search...' className='icon' onChange={ (event) => setSearch(event.target.value) }/>
                <button className="boton" onClick={()=>{dispatch( getRecipes(search) )}}>Search</button>
            </div>
            <div className="varios">
                <div className="varios">
                    <p><b>Filters:</b></p>
                    <select className="objects" multiple={true} name="diets" value={selectedDiets} onChange={changeDiets}>
                        {diets && diets.map( diet => { return(<option key={diet.ID} value={diet.ID}>{diet.name}</option>) } )}
                    </select>
                    <select className="objects" multiple={false} name="internalFlag" value={selectedFlag} onChange={changeFlag}>
                        {flags.map( flag => { return(<option key={flag.ID} value={flag.value}>{flag.name}</option>) } )}
                    </select>
                </div>
                <div className="varios">
                    <p><b>Ordering:</b></p>
                    <select className="objects" multiple={false} name="orderMethod" value={selectedOrderMethod} onChange={changeOrderMethod}>
                        {orderMethod.map( method => { return(<option key={method.ID} value={method.name}>{method.name}</option>) } )}
                    </select>
                    <select className="objects" multiple={false} name="order" value={selectedOrder} onChange={changeOrder}>
                        {orders.map( order => { return(<option key={order.ID} value={order.name}>{order.name}</option>) } )}
                    </select>
                    <button className="boton" onClick={()=>{dispatch( resetRecipes() )}}>Reset</button>
                </div>
            </div>
        </div>
    )
};

export default Filtering;