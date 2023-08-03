import React, { useState, useEffect } from "react";
import '../styles/mealMenu.css';

const MealMenu = (country) => {
    const countrySelected = country.country
    const [meals, setMeals] = useState([]);
    let mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countrySelected}`;
  
    const fetchMeals = async (countrySelected) => {
        const response = await fetch(mealUrl);
        const responseJSON = await response.json();
        setMeals(responseJSON.meals); 
    }

    useEffect(() => {
        fetchMeals();
      }, [country])

    return (
        <div className="menu-wrapper">
                { 
                meals.map((meal) => {
                return ( 
                    <div className="meals-wrapper">
                        <li key={meal.idMeal} className="meal-title">{meal.strMeal} </li>
                        <div className="image-wrapper">
                            <img src={`${meal.strMealThumb}`} alt="meal" className="image-styles"/>
                        </div>
                    </div>)
                })}
        </div>
      )
}

export default MealMenu;