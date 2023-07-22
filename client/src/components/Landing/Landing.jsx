import './Landing.css';

import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div>
            <h2>Welcome to Henry Food!</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuc8HIprl-ax2L9JbgPps_6XEtvGLp5ygUQ&usqp=CAU" alt="Landing Image" />
            <Link to="/recipes">
                <button>Home Page</button>
            </Link>
        </div>
    );
};

export default Landing;