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
    
    let listOfRecipes = [
        {   
            description: 'Put it in the oven and go!',
            tags: 'cheese, oven'
        },
        {
            description: 'Cheesy Macaroni, straight out of the oven!',
            tags: 'cheese, oven, mac'
        },
        {
            description: "Available for self-cooking or as an instant.",
            tags: 'omnomnom, noodles, instant'
        },
        {
            description: "Everytime in the city after midnight",
            tags: 'kapsalon, tasty, meat'
        },
        {
            description: "Specialty when on holiday in Spain",
            tags: 'fish, rice'
        },
        {   
            description: "Order or make it yourself!",
            tags: 'fish, seaweed, food'
        },
        {
            description: "Meat (pork or chicken) served with potato, onion, tomato, tzatziki or yogurt!",
            tags: 'meat, fresh vegetables, pork, chicken'
        },
        {
            description: "Straight out of heaven.",
            tags: 'omnomnom, cheese, oven'
        },
        {
            description: "Famous in Berlin, lovely to eat.",
            tags: 'bread, potato, tasty, meat'
        },
        {
            description: "Цыка блять, советы идут",
            tags: "pancake, savory, sweet"
        }
    ]

    let recipeText = document.getElementById('recipe');
    let tagsText = document.getElementById('tags');
    recipeText.innerHTML = `${listOfRecipes[btnIndex].description}`;
    tagsText.innerHTML = `${listOfRecipes[btnIndex].tags}`;

}