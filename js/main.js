window.addEventListener('load', init);

// global variables
let recipesSection;
let buttonsRecipe;
let buttonsFavorite;
let currentClickedRecipe;
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
        description: 'Available for self-cooking or as an instant.',
        tags: 'omnomnom, noodles, instant'
    },
    {
        description: 'Everytime in the city after midnight',
        tags: 'kapsalon, tasty, meat'
    },
    {
        description: 'Specialty when on holiday in Spain',
        tags: 'fish, rice'
    },
    {   
        description: 'Order or make it yourself!',
        tags: 'fish, seaweed, food'
    },
    {
        description: 'Meat (pork or chicken) served with potato, onion, tomato, tzatziki or yogurt!',
        tags: 'meat, fresh vegetables, pork, chicken'
    },
    {
        description: 'Straight out of heaven.',
        tags: 'omnomnom, cheese, oven'
    },
    {
        description: 'Famous in Berlin, lovely to eat.',
        tags: 'bread, potato, tasty, meat'
    },
    {
        description: 'Цыка блять, советы идут',
        tags: 'pancake, savory, sweet'
    }
]
let favorites = [];

function init() {

    // Get entire section with all recipes
    recipesSection = document.getElementById('recipes');
    recipesSection.addEventListener('click', clickHandler);

    // Get all the buttons with classname
    buttonsRecipe = document.getElementsByClassName('recipe-btn');
    toggleFavorites = document.getElementsByClassName('favorite-btn');

    // Add an index to each button (for later usage to show recipe)
    for (let i = 0; i < buttonsRecipe.length; i++) {
        buttonsRecipe[i].dataset.index = i.toString();
    }

    // Add an index to each button (for later usage to add and delete
    // favorites)
    for (let i = 0; i < buttonsRecipe.length; i++) {
        toggleFavorites[i].dataset.index = i.toString();
    }

}

// Function to check what function has to be executed
function clickHandler(e) {

    if (e.target.nodeName !== "BUTTON") {
        
        return

    } else if (e.target.classList.contains("recipe-btn") === true) {

        showRecipe(e);

    } else if (e.target.classList.contains("favorite-btn") === true) {

        addFavorite(e);

    } else {
        
        /*  
            In case there is more buttons, which do not have either of these classes.
            You could argue a bit unnessecary, but in case we would want to add more
            buttons, you wouldn't have to worry about it executing a wrong function.
        */
        return;

    }

}

function showRecipe(e) { 
    console.log("recipe")

    // Get button and id of button for the right info
    let btn = e.target;
    let btnIndex = btn.dataset.index;
    console.log(btnIndex)
    
    let recipeText = document.getElementById('recipe');
    let tagsText = document.getElementById('tags');
    recipeText.innerHTML = listOfRecipes[btnIndex].description;
    tagsText.innerHTML = listOfRecipes[btnIndex].tags;

}

function addFavorite(e) {
    
}

