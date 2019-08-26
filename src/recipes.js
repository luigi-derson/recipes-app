import uuid from 'uuid'
import { generateRecipeToDOM, renderIngredients, renderRecipes } from './views'

let recipes = []
const ingredients = []

const loadRecipes = () => {
    const JSONrecipes = localStorage.getItem('recipes')

    try {
        JSONrecipes ? recipes = JSON.parse(JSONrecipes) : []
    } catch (e) {
        recipes = []
    }
}

const saveRecipes = () => {
    const recipeList = JSON.stringify(recipes)
    localStorage.setItem('recipes', recipeList)
}

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuid()
    recipes.push({
        title: '',
        steps: '',
        id: id,
        ingredients: []
    })
    saveRecipes()
    location.assign(`/edit.html#${id}`)
}

const removeRecipe = (id) => {
    const index = recipes.findIndex(recipe => id === recipe.id)
    if (index > -1) {
        recipes.splice(index, 1)
        saveRecipes()
    } 
}

const addIngredient = (ingredient) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientId = uuid()
    recipe.ingredients.push({
        name: ingredient,
        itHas: false,
        id: ingredientId
    })
    saveRecipes()
    renderIngredients(recipe)
}

const toggleIngredient = (id) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredient = recipe.ingredients.find(ingred => ingred.id === id)
    ingredient.itHas = !ingredient.itHas
    saveRecipes()
    renderIngredients(recipe)
}

const removeIngredient = (id) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex(ingred => ingred.id === id)
    recipe.ingredients.splice(ingredientIndex,1)
    saveRecipes()
    renderIngredients(recipe)
}


loadRecipes()


export { loadRecipes, saveRecipes, getRecipes, createRecipe, removeRecipe, addIngredient, removeIngredient, toggleIngredient }