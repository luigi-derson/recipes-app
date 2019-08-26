import { loadRecipes, getRecipes, toggleIngredient, removeIngredient, saveRecipes } from './recipes'


const renderRecipes = () => {
    const recipesList = document.querySelector('#recipes-list')
    const recipes = getRecipes()
    recipesList.innerHTML = ''
    recipes.forEach((recipe) => {
        recipesList.appendChild(generateRecipeToDOM(recipe))
    })
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
    const recipeSteps = document.createElement('p')
    const recipeIngredients = document.createElement('div')

    recipeCard.classList.add('recipe-card')

    recipeTitle.textContent = recipe.title
    recipeTitle.classList.add('recipe-title')
    recipeCard.appendChild(recipeTitle)

    recipeSteps.textContent = recipe.steps
    recipeSteps.classList.add('recipe-steps')
    recipeCard.appendChild(recipeSteps)

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
        removeIngredient(ingredient.id)
    })

    return containerEl 
}

const loadEditPage = (recipeId) => {
    const recipeTitle = document.querySelector('#recipe-title')
    const recipeSteps = document.querySelector('#recipe-steps')

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    recipeTitle.value = recipe.title
    recipeSteps.value = recipe.steps

    renderIngredients(recipe)

    return recipe
}


export { generateRecipeToDOM, renderRecipes, generateIngredientsToDOM, loadEditPage, renderIngredients }