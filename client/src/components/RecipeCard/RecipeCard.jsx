import "./RecipeCard.css";

const RecipeCard = ({id, name, image}) => {
    return(
        <div className="card">
            <img src={image} alt={name}/>
            <p><b>Name:</b> {name}</p>
            <p><b>ID:</b> {id}</p>
        </div>
    );
};

export default RecipeCard;