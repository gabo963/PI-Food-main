const RecipeCard = ({id, name, image}) => {
    return(
        <div>
            <p>Name: {name}</p>
            <p>ID: {id}</p>
            <img src={image} alt={name} />
        </div>
    );
};

export default RecipeCard;