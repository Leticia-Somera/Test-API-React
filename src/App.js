import './App.css';
import React, { useEffect, useState } from 'react';
import MealMenu from './components/MealMenu';
import './styles/countriesList.css';
import './styles/global.css';

function App() {
  
  const [countries, setCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState();

  const countriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const fetchCountries = async () => {
      const response = await fetch(countriesUrl);
      const responseJSON = await response.json();
      setCountries(responseJSON.meals); 
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  const handleCountryMenu = () => {
    setIsOpen(true);
  }

  const handleCountrySelected = (countrySelected) => {
    setSelectedCountry(countrySelected)
    setIsOpen(false)
  }

  return (
    <div className="App">
      <h1>Bienvenid@!! </h1>
      <h3>Aquí conocerás cuáles son los platillos típicos de cada País</h3>
      <h2>¿Qué tipo de comida te apetece conocer?</h2>
      
      <div className='wrapper-global'>
        <div>
          <div className='button-wrapper'>
            <button onClick={handleCountryMenu} className='dropdown-button'>
              Elige el tipo de comida
            </button>
          </div>
          
          {isOpen && (
            <div className='dropdown-menu'>
              { !countries ? 'Loading... ' 
              : countries.map((country) => {
                return ( 
                  <li key={country.strArea} onClick={() => handleCountrySelected(country.strArea)} >{country.strArea} </li>
                  )
              })}
            </div>
          )}
        </div>
       
        <div className='input-wrapper'>
          <input
            className='input-styles'
            type="text"
            value={selectedCountry || ''}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
        </div>
        
      </div>

      {selectedCountry===null 
      ? <div className='please-select'>
        <p>Selecciona un tipo de comida para conocer sus platillos más populares</p>
        </div> 
      : <div>
          <MealMenu country={selectedCountry} />
        </div>
      }
    </div>
  );
}

export default App;
