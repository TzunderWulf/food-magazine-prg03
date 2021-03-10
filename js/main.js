window.addEventListener('load', init);

// global variables
let recipesSection;
let buttonsRecipe;
let buttonsFavorite;
let currentClickedRecipe;

function init() {

    // get entire section with all recipes
    recipesSection = document.getElementById('recipes');
    recipesSection.addEventListener('click', showRecipe);

    // get all the buttons with classname
    buttonsRecipe = document.getElementsByClassName('recipe-btn');
    // toggleFavorites = document.getElementsByClassName('favorite-btn');

    // add an index to each button (for later usage to show recipe)
    for (let i = 0; i < buttonsRecipe.length; i++) {
        buttonsRecipe[i].dataset.index = i.toString();
    }

}

// clickhandler (to show recipe)
function showRecipe(e) { 
    
    // make sure it is a button and belong to right class
    if (e.target.nodeName !== "BUTTON" || e.target.classList.contains("recipe-btn") === false) {

        return;
        
    }

    // get button and id of button for the right info
    let btn = e.target;
    let btnIndex = btn.dataset.index;

    let listOfRecipes = ["Put it in the oven and go!", "Cheesy Macaroni, straight out of the oven!", "Available for self-cooking or as an instant.", "Everytime in the city after midnight",
    "Specialty when on holiday in Spain", "Order or make it yourself!", "Meat (pork or chicken) served with potato, onion, tomato, tzatziki or yogurt!", "Straight out of heaven.",
    "Famous in Berlin, lovely to eat.", "Цыка блять, советы идут"];

    let tags = ['cheese, oven', 'cheese, oven, mac', 'omnomnom, noodles, instant', 'kapsalon, tasty, meat', 'fish, rice', 'fish, seaweed, food', 
    'meat, fresh vegetables, pork, chicken', 'omnomnom, cheese, oven', 'bread, potato, tasty, meat', "pancake, savory, sweet",]

    //let detailView = document.getElementById('detail-view');

    // selecting all elements
    // both divs for recipe and tags
    let recipeDiv = document.getElementById('recipe-dish');
    let tagsDiv = document.getElementById('dish-tags');

    // both headers 1 for recipe and tags
    let recipeHeader = document.getElementById('recipe-header');
    let recipeText = document.getElementById('recipe-text');

    // both headers 2 for recipe and tags
    let tagsHeader = document.getElementById('tags-header');
    let tagsText = document.getElementById('tags-text');

    // fill in the right info
    recipeHeader.innerHTML = "Recipe";
    recipeText.innerHTML = listOfRecipes[btnIndex];
    tagsHeader.innerHTML = "Related tags";
    tagsText.innerHTML = tags[btnIndex];

}