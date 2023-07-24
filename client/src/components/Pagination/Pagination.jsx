import "./Pagination.css";

const Pagination = ( {totalPosts, postsPerPage, setCurrentPage} ) => {

    const pages = [];

    for( let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++ ) {
        pages.push(i);
    }

    return( 
        <div className="contenedor">
            {pages && pages.map( page => <button className="numero" key={page} onClick={()=>{setCurrentPage(page)}}>{page}</button> )}
        </div>
     )
};

export default Pagination;