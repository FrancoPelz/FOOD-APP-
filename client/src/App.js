import './App.css';
import RecipeDetail from './components/recipeDetail/recipeDetail';
import Landing from './components/landingPage/landingPage';
import { Route } from 'react-router-dom';
import Home from './components/home/home';
import AddRecipe from './components/createRecipe/createRecipe';
//import NotFound from './components/notFound/notFound';


function App() {
  return (
    <div className="App">
        <Route exact path={'/home'} component={Home}/>
        <Route path={'/create'} component={AddRecipe}/>
        <Route path={'/recipes/:id'} component={RecipeDetail}/>
    </div>
  );
}

export default App;
