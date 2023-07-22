const RecipeCard = ({id, name}) => {
    return(
        <div>
            <p>Name: {name}</p>
            <p>ID: {id}</p>
        </div>
    );
};

export default RecipeCard;