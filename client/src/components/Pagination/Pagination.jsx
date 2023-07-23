import "./Pagination.css";

const Pagination = ( {recipes} ) => {

    const perPage = 9;
    let pages = parseInt(recipes.length / perPage);
    pages = pages < 1 ? 1 : pages;
    const numeros = [];
    for( let i = 0; i < pages; i++ ) {
        numeros.push(i+1);
    }

    return( 
        <div className="contenedor">
            {numeros && numeros.map( numero => <div className="numero" >{numero}</div> )}
        </div>
     )
};

export default Pagination;