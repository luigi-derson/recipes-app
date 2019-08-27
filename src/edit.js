import { loadRecipes, saveRecipes, removeRecipe, addIngredient } from './recipes'
import { loadEditPage } from './views'

const recipeTitle = document.querySelector('#recipe-title')
const recipeDescription = document.querySelector('#recipe-description')
const recipeSteps = document.querySelector('#recipe-steps')
const addIngredientForm = document.querySelector('#add-ingredient')
const removeRecipeButton = document.querySelector('#remove-recipe')
const recipeId = location.hash.substring(1)

const recipe = loadEditPage(recipeId)

recipeTitle.addEventListener('input', (e) => {
    recipe.title = e.target.value
    saveRecipes()
})

recipeDescription.addEventListener('input', (e) => {
    recipe.description = e.target.value
    saveRecipes()
})

recipeSteps.addEventListener('input', (e) => {
    recipe.steps = e.target.value
    saveRecipes()
})

addIngredientForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const ingredient = e.target.elements.ingredient.value
    addIngredient(ingredient)

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
