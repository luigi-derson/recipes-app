import uuid from 'uuid'
import { generateRecipeToDOM, renderIngredients, renderRecipes, loadEditPage } from './views'

let recipes = []


const loadRecipes = () => {
    const JSONrecipes = localStorage.getItem('recipes')

    try {
        recipes = JSONrecipes ? JSON.parse(JSONrecipes) : []
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
        description: '',
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
        loadEditPage(id)
    } 
}

const addIngredient = (ingredient) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientExist = recipe.ingredients.find(ing => ing.name.toLowerCase() === ingredient.toLowerCase())

    if (ingredient.length > 0 && !ingredientExist) {
        recipe.ingredients.push({
            name: ingredient.trim(),
            itHas: false,
            quantity: 0
        })
        saveRecipes()
        renderIngredients(recipe)
    } else {
        ingredientExist.quantity += 1
        saveRecipes()
    }
}

const toggleIngredient = (id) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredient = recipe.ingredients.find(ingred => ingred.id === id)
    ingredient.itHas = !ingredient.itHas
    saveRecipes()
    renderIngredients(recipe)
}

const removeIngredient = (ingredient) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex(ing => ing.name.toLowerCase() === ingredient.toLowerCase())

    recipe.ingredients.splice(ingredientIndex, 1)
    
    saveRecipes()
    renderIngredients(recipe)
}

loadRecipes()

export { loadRecipes, saveRecipes, getRecipes, createRecipe, removeRecipe, addIngredient, removeIngredient, toggleIngredient }