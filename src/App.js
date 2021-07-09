import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData]= useState([]);

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

  // useEffect hooks
  useEffect(doFetch,[])

  return (
    <div className="App">
      Content!
    </div>
  );
}

export default App;
