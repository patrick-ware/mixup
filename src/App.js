import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData]= useState([]);
  const [searchDrink, setSearchDrink]= useState("");

  // fetch data from API
  function doFetch(){
    const api = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"

    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error ('Network response was not ok');      
        } 
        return response.json()
      })
      .then(data => {
        console.log("this is data", data)
          setData(data.drinks)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
   }

  // set searched drink value
  function getSearchDrinkValue(ev){
    if (ev.key === "Enter"){ 
      ev.preventDefault();
    }
    setSearchDrink(ev.target.value);
  }


  // useEffect hooks
  useEffect(doFetch,[])

  return (
    <div className="App">
      <div className="title-bar">
        <span className="title">▲ mixup ▼</span>
      </div>
      <div className="drinks">
        <div className="search">
          <form>
            <input
              className="search-bar" 
              type="text"
              placeholder="Search by drink name"
              value={searchDrink}
              onChange={getSearchDrinkValue}
            >
            </input>
          </form>
        </div>
        { 
          Object.entries(data)
            .map(([key, drink]) => 
              <div className="drink-card" key={drink.idDrink}>
                <div>
                  <img className="drink-img" src={drink.strDrinkThumb} alt={"drink "+ drink.strDrink}/>
                </div>
                <div className="drink-info">
                  <a className="drink-name" href={"www.thecocktaildb.com/api/json/v1/1/search.php?s="+drink.strDrink} target="_blank">{drink.strDrink}</a>
                  <div className="drink-detail">ID # {drink.idDrink}</div>
                </div>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default App;
