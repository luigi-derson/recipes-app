import { loadRecipes, getRecipes } from './recipes'

const renderRecipes = () => {
    const recipesList = document.querySelector('#recipes-list')
    const recipes = getRecipes()
    recipesList.innerHTML = ''
    recipes.forEach((recipe) => {
        recipesList.appendChild(generateRecipeToDOM(recipe))
    })
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

    recipeIngredients.textContent = `You have ${recipe.length} ingredients`
    recipeIngredients.classList.add('recipe-ingredients')
    recipeCard.appendChild(recipeIngredients)

    recipeWrap.appendChild(recipeCard)
    recipeWrap.setAttribute('href', `/edit.html#${recipe.id}`)

    return recipeWrap
}

export { generateRecipeToDOM, renderRecipes }