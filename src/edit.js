import { loadRecipes, getRecipes, saveRecipes, createRecipe, removeRecipe, addIngredient, removeIngredient } from './recipes'

const recipeTitle = document.querySelector('#recipe-title')
const recipeSteps = document.querySelector('#recipe-steps')
const recipeIngredients = document.querySelector('#ingredients-list')
const inputIngredient = document.querySelector('#input-ingredient')
const addIngredientButton = document.querySelector('#button-ingredient')
const removeRecipeButton = document.querySelector('#remove-recipe')

const recipeId = location.hash.substring(1)

const recipes = getRecipes()
let recipe = recipes.find((recipe) => recipe.id === recipeId)

recipeTitle.value = recipe.title
recipeSteps.value = recipe.steps
recipeIngredients.textContent = recipe.ingredients
