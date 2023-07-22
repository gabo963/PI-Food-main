import './App.css';
import {Routes, Route} from "react-router-dom";
import RecipeCards from './components/RecipeCards';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/celulares/:id" element={<CelularDetail />}/>
        <Route path="/celulares/create" element={<CreateCelular />}/>
      </Routes>
    </div>
  );
}

export default App;
