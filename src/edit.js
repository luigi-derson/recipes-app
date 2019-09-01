import { loadRecipes, saveRecipes, removeRecipe, addIngredient, addStep, editSteps } from './recipes'
import { loadEditPage } from './views'

const recipeTitle = document.querySelector('#recipe-title'),
    recipeInfo = document.querySelector('#recipe-info'),
    recipeDescription = document.querySelector('#recipe-description'),
    recipeSteps = document.querySelector('#add-step'),
    editStepsButton = document.querySelector('#edit-steps-button'),
    addIngredientForm = document.querySelector('#add-ingredient'),
    removeRecipeButton = document.querySelector('#remove-recipe'),
    recipeId = location.hash.substring(1),
    recipe = loadEditPage(recipeId)

recipeTitle.addEventListener('input', (e) => {
    recipe.title = e.target.value
    saveRecipes()
})

recipeDescription.addEventListener('input', (e) => {
    recipe.description = e.target.value
    saveRecipes()
})

recipeSteps.addEventListener('submit', (e) => {
    e.preventDefault()
    const step = e.target.elements.step.value
    addStep(recipe, step)

    e.target.elements.step.value = ''
})

editStepsButton.addEventListener('click', () => {
    if (recipe.steps.length > 0) {
        editSteps(recipe, recipeInfo, editStepsButton)
    }   
})

addIngredientForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const ingredient = e.target.elements.ingredient.value
    addIngredient(recipe, ingredient)

    e.target.elements.ingredient.value = ''
})

removeRecipeButton.addEventListener('click', () => {
    if(confirm('This recipe will be completely removed. Are you sure?')) {
        removeRecipe(recipeId)
    }

})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        loadEditPage(recipeId)
    }
})
