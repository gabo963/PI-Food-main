const RecipeCard = ({id, name, image}) => {
    return(
        <div className="card">
            <p>Name: {name}</p>
            <p>ID: {id}</p>
            <img src={image} alt={name} width={200}/>
            <hr />
        </div>
    );
};

export default RecipeCard;