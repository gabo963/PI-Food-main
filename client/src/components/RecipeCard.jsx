const RecipeCard = ({key, name}) => {
    return(
        <div>
            <p>Name: {name}</p>
            <p>ID: {key}</p>
        </div>
    );
};

export default RecipeCard;