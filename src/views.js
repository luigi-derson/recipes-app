import { getRecipes, toggleIngredient, removeIngredient } from './recipes'
import { getFilters } from './filters'


const renderRecipes = () => {
    const recipesList = document.querySelector('#recipes-list')
    const filters = getFilters()
    const recipes = getRecipes()

    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))
    recipesList.innerHTML = ''
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            recipesList.appendChild(generateRecipeToDOM(recipe))
        })
    } else {
        recipesList.innerHTML = 'There are not recipes to show, create a new one.'
    }
    
}

const renderIngredients = (recipe) => {
    const recipeIngredients = document.querySelector('#ingredients-list')
    
    recipeIngredients.innerHTML = ''
    
    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            recipeIngredients.appendChild(generateIngredientsToDOM(ingredient))
        })
    } else {
        recipeIngredients.innerHTML = 'No ingredients yet, add them!'
    }
}

const generateRecipeToDOM = (recipe) => {
    const recipeWrap = document.createElement('a')
    const recipeCard = document.createElement('div')
    const recipeTitle = document.createElement('span')
    const recipeDescription = document.createElement('p')
    const recipeIngredients = document.createElement('div')

    recipeCard.classList.add('recipe-card')

    recipeTitle.textContent = recipe.title
    recipeTitle.classList.add('recipe-title')
    recipeCard.appendChild(recipeTitle)

    recipeDescription.textContent = recipe.description
    recipeDescription.classList.add('recipe-description')
    recipeCard.appendChild(recipeDescription)

    recipeIngredients.textContent = `You have ${recipe.ingredients.length} ingredients`
    recipeIngredients.classList.add('recipe-ingredients')
    recipeCard.appendChild(recipeIngredients)

    recipeWrap.appendChild(recipeCard)
    recipeWrap.setAttribute('href', `/edit.html#${recipe.id}`)
    
    return recipeWrap
}

const generateIngredientsToDOM = (ingredient) => {
    const containerEl = document.createElement('div')
    const checkEl = document.createElement('input')
    const textEl = document.createElement('span')
    const removeEl = document.createElement('button')

    checkEl.setAttribute('type', 'checkbox')
    checkEl.checked = ingredient.itHas
    containerEl.appendChild(checkEl)
    checkEl.addEventListener('change', () => {
        toggleIngredient(ingredient.id)
    })

    textEl.textContent = ingredient.name
    containerEl.appendChild(textEl)

    removeEl.textContent = 'remove'
    containerEl.appendChild(removeEl)
    removeEl.addEventListener('click', () => {
        removeIngredient(ingredient.name)
    })

    return containerEl 
}

const loadEditPage = (recipeId) => {
    const recipeTitle = document.querySelector('#recipe-title')
    const recipeDescription = document.querySelector('#recipe-description')
    const recipeSteps = document.querySelector('#recipe-steps')

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    recipeTitle.value = recipe.title
    recipeDescription.value = recipe.description
    recipeSteps.value = recipe.steps

    renderIngredients(recipe)

    return recipe
}


export { generateRecipeToDOM, renderRecipes, generateIngredientsToDOM, loadEditPage, renderIngredients }