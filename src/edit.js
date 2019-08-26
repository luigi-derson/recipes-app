import { loadRecipes, getRecipes, saveRecipes, createRecipe, removeRecipe, addIngredient, removeIngredient } from './recipes'
import { loadEditPage, renderIngredients } from './views'

const recipeTitle = document.querySelector('#recipe-title')
const recipeSteps = document.querySelector('#recipe-steps')
const addIngredientForm = document.querySelector('#add-ingredient')
const removeRecipeButton = document.querySelector('#remove-recipe')

const recipeId = location.hash.substring(1)
const recipe = loadEditPage(recipeId)

recipeTitle.addEventListener('input', (e) => {
    recipe.title = e.target.value
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
