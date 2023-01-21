const searchBtn=document.getElementById('search-btn');
const mealList=document.getElementById('meal');
const mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
searchBtn.addEventListener('click', getMealList);
 mealList.addEventListener('click', getMealRecipe);
 recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
// get the list of meals that matches with the ingrediants
function getMealList(){
    let searchInputTxt=document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        //  console.log(data.meals[0]);
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html+=
        `
        <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
          <div class = "meal-name">
            <h3>${meal.strMeal}</h3>
            <a href = "#" class = "recipe-btn">Get Recipe</a>
          </div>
        </div>`
        ;
            }); 
            mealList.classList.remove('notFound');
        }
        else{
            html="sorry,we have no such meal."
            mealList.classList.add('notFound');
        }  
        mealList.innerHTML=html;
        });
}
// fetch(www.themealdb.com/api/json/v1/1/random.php)
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealitem=e.target.parentElement.parentElement;
        var dataId = mealitem.getAttribute("data-id");
        mealRecipeModel(dataId);
    }
    // if(e.target.classList.contains(''))
}
function mealRecipeModel(dataId){
    let html="";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}`)
    .then(response=>response.json())
    .then(data =>{
        console.log(data);
        let datas=data.meals[0];
        html=`<h2 class = "recipe-title">${datas.strMeal}</h2>
        <p class = "recipe-category">${datas.strCategory}</p>
        <div class = "recipe-instruct">
          <h3>Instructions:</h3>
          <p>${datas.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
          <img src = "${datas.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
          <a href = "${datas.strYoutube}" target = "_blank">Watch Video</a>
        </div>`;
        mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
    });
    
}
