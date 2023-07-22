import './App.css';
import {Routes, Route} from "react-router-dom";
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/recipes" element={<Home />}/>
        <Route path="/recipes/:id" element={<RecipeDetail />}/>
        <Route path="/recipes/create" element={<RecipeCreate />}/>
      </Routes>
    </div>
  );
}

export default App;
