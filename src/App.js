import './App.css';
import { useEffect, useState } from 'react';
import Recipe from './Recipe';

function App() {
  const APP_ID = "9eaab399"
  const APP_KEY = "8f88bd27da64c446038f361385095811"
  const [recipes, setReicpes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

    
  
  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(exampleReq)
    const data =await response.json()
    setReicpes(data.hits)
    console.log(data.hits);
  }
  const updateSearch = (e) => {
    setSearch(e.target.value)
  }
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          image={recipe.recipe.image}
          calories={recipe.recipe.calories}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
