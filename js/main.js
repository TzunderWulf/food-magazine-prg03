// Add eventlistener to start functions, after window is loaded.
window.addEventListener('load', init);

const recipes = document.getElementById('recipes'); // Section housing the dishes
let webserviceURL; let btn; let btnId; let btnParent; let storedString; let storedData;
let favorites = [];

function init() {
    getData();

    recipes.addEventListener('click', clickHandler);
    
    /*
        Get old favorites and push them back into favorites array, so if you add
        new favorites, you also get the old ones back when reloading.
    */
    storedString = localStorage.getItem('favorites');

    if (storedString != undefined) {
        storedData = JSON.parse(storedString);
        for (let favorite of storedData) {
            favorites.push(favorite)
        }
    }
}

/* 
    Function clickHandler, to check what needs to be executed, when
    one of the two buttons is pressed.
*/
function clickHandler (e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    } else if (e.target.classList.contains('favorite-btn')) {
        if (e.target.parentNode.classList.contains('favorite-recipe')) {
            removeFromFavorites(e);
        } else {
            addToFavorite(e);
        }
    } else if (e.target.classList.contains('recipe-btn')) {
        showRecipe(e);
    }
}

/*
    Function showRecipe, when the recipe button is clicked, show the
    recipe in the detail view (aside element)
*/
function showRecipe (e) {
    btn = e.target;
    btnId = btn.dataset.id;
    webserviceURL = `webservice/index.php?id=${btnId}`;

    fetch(webserviceURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let recipe = document.getElementById('show-recipe');
            recipe.innerText = data.recipe;

            let tags = document.getElementById('show-tags');
            tags.innerText = data.tags;
        });
}

/*
    Function addToFavorite, when the favorite button is clicked, we
    then add that to localstorage and give it a special class.
    Once clicked, changes text within the button to "remove from 
    favorites".
*/
function addToFavorite (e) {
    btn = e.target;
    btnId = btn.dataset.id;
    btn.innerText = 'Remove from favorites';
    btnParent = btn.parentNode;
    btnParent.classList.add('favorite-recipe');

    favorites.push(btnId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/*
    Function removeFromFavorites, when the favorite button is clicked 
    again, we then remove it from localstorage and the class. We also
    reset the text within the button to "Add to favorites". 
*/
function removeFromFavorites (e) {
    btn = e.target;
    btnId = btn.dataset.id;
    btn.innerText = 'Add to favorites';
    btnParent = btn.parentNode;
    btnParent.classList.remove('favorite-recipe');

    // Get the data and parse it
    storedString = localStorage.getItem('favorites');
    storedData = JSON.parse(storedString);

    // Get the index of the item in the array
    let storedArrayIndex = storedData.indexOf(btnId);
    let favoritesArrayIndex = favorites.indexOf(btnId);

    // Remove from the array (storedData) and the favorites array
    storedData.splice(storedArrayIndex, storedArrayIndex + 1);
    favorites.splice(favoritesArrayIndex, favoritesArrayIndex + 1);

    // Update the storage (reset it)
    localStorage.setItem('favorites', JSON.stringify(storedData));
}

/*
    Function fillInFromLocalstorage, once the page is reloaded, we want
    our favorites to be returned and given the class.
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

/*
    Function getData, once the page loads, get the data and print it to
    the page (creating tags) if succesfull. If not give a error.
*/
function getData() {
    webserviceURL = 'webservice/index.php';
    fetch(webserviceURL)
        .then(response => response.json())
        .then(getDataSuccess)
        .catch(getDataFail)
}

// Function getDataSuccess, if its a success we then create the elements.
function getDataSuccess (data) {
    for (let item of data) {
        // Create all elements to put in information
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.dataset.id = item.id;
        recipes.appendChild(recipeDiv);

        const title = document.createElement('h2');
        title.classList.add('title-recipe');
        title.innerText = item.name; // Return the name of the object
        recipeDiv.appendChild(title);

        const img = document.createElement('img');
        img.classList.add('image-recipe');
        img.setAttribute('src', `https://source.unsplash.com/1300x900?${item.searchtag}`)
        img.setAttribute('alt', item.name);
        recipeDiv.appendChild(img);

        fillInFromLocalstorage(recipeDiv);

        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('standard-btn', 'favorite-btn');
        if (recipeDiv.classList.contains('favorite-recipe')) {
            favoriteBtn.innerText = 'Remove from favorites';
        } else {
            favoriteBtn.innerText = 'Add to favorites';
        }
        favoriteBtn.dataset.id = item.id;
        recipeDiv.appendChild(favoriteBtn);

        const recipeBtn = document.createElement('button');
        recipeBtn.classList.add('standard-btn', 'recipe-btn');
        recipeBtn.innerText = 'Show recipe';
        recipeBtn.dataset.id = item.id;
        recipeDiv.appendChild(recipeBtn);
    }
}

/*
    Function getDataFail, if it doesn't get data, give an error message back.
    As fun detail, it gives back a random cat image.
*/
function getDataFail (data) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');

    const errorMessage = document.createElement('h1');
    errorMessage.innerText = 'Sad noises, API is broken.';

    let errorImg = document.createElement('img');
    errorImg.classList.add('error-picture');
    fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(data => {
            errorImg.setAttribute('src', data.file);
        });
    
    errorDiv.appendChild(errorMessage);
    errorDiv.appendChild(errorImg);
    recipes.appendChild(errorDiv);
}