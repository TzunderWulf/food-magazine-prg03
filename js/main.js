window.addEventListener('load', init);

let btn;
let btnIndex;
let recipeDiv;
let storedString;
let storedData
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
    let recipesSection = document.getElementById('recipes');
    recipesSection.addEventListener('click', clickHandler);

    let buttonsRecipes = document.getElementsByClassName('recipe-btn');
    let toggleFavorites = document.getElementsByClassName('favorite-btn');

    // We can use the same for loop for both elements, every recipe
    // will always have to have two buttons.
    for (let i = 0; i < buttonsRecipes.length; i++) {
        buttonsRecipes[i].dataset.index = i.toString();
        toggleFavorites[i].dataset.index = i.toString();
    }

    storedString = localStorage.getItem('favorites');

    if (storedString != undefined) {
        storedData = JSON.parse(storedString);
        for (let favorite of storedData) {
            fillFromStorage(favorite);
        }
    }
}

// clickHandler, to make sure what function has to be executed
function clickHandler(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    } else if (e.target.classList.contains('recipe-btn')) {
        showRecipe(e);
    } else if (e.target.classList.contains('favorite-btn')) {
        if (e.target.parentNode.classList.contains('favorite-recipe')) {
            deleteFavorite(e);
        } else {
            addFavorite(e);
        }
    } else {
        // In case there is more buttons, which do not have either classes.
        return
    }
}

// showRecipe, shows the recipe and tags in detailview
function showRecipe(e) {
    // Get the button and id, for the right information.
    btn = e.target;
    btnIndex = btn.dataset.index;

    let recipe = document.getElementById('recipe');
    let tags = document.getElementById('tags');
    recipe.innerHTML = listOfRecipes[btnIndex].description;
    tags.innerHTML = listOfRecipes[btnIndex].tags;
}

// addFavorite, add class and to localstorage
function addFavorite(e) {
    btn = e.target;
    btnIndex = btn.dataset.index;
    recipeDiv = btn.parentNode;
    recipeDiv.classList.add('favorite-recipe');

    favorites.push(btnIndex);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// deleteFavorite, remove class and from localstorage
function deleteFavorite(e) {
    btn = e.target;
    btnIndex = btn.dataset.index;
    recipeDiv = btn.parentNode;
    recipeDiv.classList.remove('favorite-recipe');

    storedString = localStorage.getItem('favorites');
    storedData = JSON.parse(storedString);

    // Get index of the index of the item we want to remove
    // within the array.
    let index = storedData.indexOf(btnIndex);

    // Remove the index.
    storedData.splice(index, index + 1);

    // Update the storage.
    localStorage.setItem('favorites', JSON.stringify(storedData));
}

// fillFromStorage, fill in from the localstorage
function fillFromStorage(index) {
    let recipeDivs = document.getElementsByClassName('recipe');

    // For every div check if the index is found in the localstorage.
    for (let i = 0; i < recipeDivs.length; i++) {
        recipeDivs[i].dataset.index = i.toString();
        if (recipeDivs[i].dataset.index == index) {
            recipeDivs[i].classList.add('favorite-recipe');
        }
    }
}