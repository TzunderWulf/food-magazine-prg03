window.addEventListener('load', init);

const recipes = document.getElementById('recipes');
let webserviceURL; let button; let buttonId; let buttonParent; let storedString; let storedData;
let favorites = [];

function init() {
    getDishesFromWebservice(); 

    recipes.addEventListener('click', clickHandler);
    

    // Get the old favorites, so if you add new ones, the old ones will not be removed.
    storedString = localStorage.getItem('favorites');

    if (storedString != undefined) {
        storedData = JSON.parse(storedString);
        for (let favorite of storedData) {
            favorites.push(favorite);
        }
    }
}

/** 
 * Check what function has to be executed, after entire field is clicked.
 * 
 * @param e
 */
function clickHandler (e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    } else if (e.target.classList.contains('favorite-button')) {
        if (e.target.parentNode.classList.contains('favorite-recipe')) {
            removeFromFavorites(e);
        } else {
            addToFavorite(e);
        }
    } else if (e.target.classList.contains('recipe-button')) {
        showRecipe(e);
    }
}

/** 
 * When recipe button is clicked, make a fetch call to get dish details.
 * 
 * @param e
 */
function showRecipe (e) {
    button = e.target;
    buttonId = button.dataset.id;

    ajaxRequest(`webservice/index.php?id=${buttonId}`, getRecipeSuccess)
}

/** 
 * If fetch is succesfull, show recipe and tags in detailview.
 * 
 * @param data
 */
function getRecipeSuccess(data) {
    let recipe = document.getElementById('show-recipe');
    recipe.innerText = data.recipe;

    let tags = document.getElementById('show-tags');
    tags.innerText = data.tags;
}

/** 
 * When favorite button is clicked, add recipe to favorite.
 * 
 * @param e
 */
function addToFavorite (e) {
    button = e.target;
    buttonId = button.dataset.id;
    button.innerText = 'Remove from favorites';

    buttonParent = button.parentNode;
    buttonParent.classList.add('favorite-recipe');

    favorites.push(buttonId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/** 
 * When favorite button is clicked, when already a favorite
 * remove from favorites.
 * 
 * @param e
 */
function removeFromFavorites (e) {
    button = e.target;
    buttonId = button.dataset.id;
    button.innerText = 'Add to favorites';
    buttonParent = button.parentNode;
    buttonParent.classList.remove('favorite-recipe');

    // Get the data and parse it
    storedString = localStorage.getItem('favorites');
    storedData = JSON.parse(storedString);

    // Get the index of the item in the array
    let storedArrayIndex = storedData.indexOf(buttonId);
    let favoritesArrayIndex = favorites.indexOf(buttonId);

    // Remove from the array (storedData) and the favorites array
    storedData.splice(storedArrayIndex, storedArrayIndex);
    favorites.splice(favoritesArrayIndex, favoritesArrayIndex);

    // Update the storage (reset it)
    localStorage.setItem('favorites', JSON.stringify(storedData));
}

/** 
 * Get the old favorites back from localstorage.
 * 
 * @param div
 */
function fillInFromLocalstorage (div) {
    storedString = localStorage.getItem('favorites');
    if (storedString != undefined) {
        storedData = JSON.parse(storedString);
        for (let favorite of storedData) {
            if (div.dataset.id === favorite) {
                div.classList.add('favorite-recipe');
            }
        }
    }
}

/** 
 * Get the dishes from local webservice.
 */
function getDishesFromWebservice() {
    ajaxRequest('webservice/index.php', showDishes)
}

/** 
 * If fetching the dishes is a succes, show the data
 * per item.
 * 
 * @param data
 */
function showDishes(data) {
    for (let item of data) {
        // Create all elements to put in information
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.dataset.id = item.id;
        recipes.appendChild(recipeDiv);

        const title = document.createElement('h2');
        title.classList.add('title-recipe');
        title.innerText = item.name; 
        recipeDiv.appendChild(title);

        const img = document.createElement('img');
        img.classList.add('image-recipe');
        img.setAttribute('src', `https://source.unsplash.com/1300x900?${item.searchtag}`)
        img.setAttribute('alt', item.name);
        recipeDiv.appendChild(img);

        fillInFromLocalstorage(recipeDiv);

        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('standard-button', 'favorite-button');

        // Check what needs to be said in button
        if (recipeDiv.classList.contains('favorite-recipe')) {
            favoriteBtn.innerText = 'Remove from favorites';
        } else {
            favoriteBtn.innerText = 'Add to favorites';
        }

        favoriteBtn.dataset.id = item.id;
        recipeDiv.appendChild(favoriteBtn);

        const recipeBtn = document.createElement('button');
        recipeBtn.classList.add('standard-button', 'recipe-button');
        recipeBtn.innerText = 'Show recipe';
        recipeBtn.dataset.id = item.id;
        recipeDiv.appendChild(recipeBtn);
    }
}

/** 
 * If fetching the dishes is a fail, show a error message
 * with an adorable cat picture/gif.
 * 
 * @param data
 */
function AJAXFail (data) {
    ajaxRequest('https://aws.random.cat/meow', createErrorMessage)
}

function createErrorMessage(data) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');

    const errorMessage = document.createElement('h1');
    errorMessage.innerText = 'Sad noises, API is broken.';

    let errorImg = document.createElement('img');
    errorImg.classList.add('error-picture');
    errorImg.setAttribute('src', data.file);

    errorDiv.appendChild(errorMessage);
    errorDiv.appendChild(errorImg);
    recipes.appendChild(errorDiv);
}

/** 
 * Generic AJAX handler, to stop DRY.
 * 
 * @param url
 * @param successHandler
 */
function ajaxRequest(url, successHandler) {
    webserviceURL = url;
    fetch(webserviceURL)
        .then(response => response.json())
        .then(successHandler)
        .catch(AJAXFail)
}