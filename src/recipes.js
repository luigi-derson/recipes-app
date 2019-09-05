import uuid from 'uuid'
import { generateRecipeToDOM, renderIngredients, renderRecipes, loadEditPage, renderSteps } from './views'

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
        id: id,
        title: '',
        description: '',
        time: '',
        difficulty: '',
        likes: '',
        steps: [],
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

const addStep = (recipe, step) => {
    if (step.length > 0) {
        recipe.steps.push(step)
        saveRecipes()
        loadEditPage(recipe.id)
    }
}

const editSteps = (li, editButton, saveButton) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const index = recipe.steps.findIndex(step => step === li.textContent)

    li.firstChild.setAttribute('contenteditable', 'true')
    editButton.style.display = 'none'
    saveButton.style.display = ''

    saveButton.addEventListener('click', () => {
        recipe.steps[index] = li.firstChild.textContent
        li.firstChild.removeAttribute('contenteditable')
        saveButton.style.display = 'none'
        editButton.style.display = ''
        saveRecipes()
    })
}

const removeStep = (step) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const stepIndex = recipe.steps.findIndex(stp=> stp.toLowerCase() === step.toLowerCase())
    recipe.steps.splice(stepIndex, 1)

    saveRecipes()
    loadEditPage(recipe.id)
}

const addIngredient = (recipe, ingredient) => {
    const ingredientExist = recipe.ingredients.find(ing => ing.name.toLowerCase() === ingredient.toLowerCase())

    if (ingredient.length > 0 && !ingredientExist) {
        recipe.ingredients.push({
            name: ingredient.trim(),
            itHas: false,
            quantity: 0
        })
        saveRecipes()
        loadEditPage(recipe.id)
    } else {
        ingredientExist.quantity += 1
        saveRecipes()
    }
}

const toggleIngredient = (ingredient) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientEl = recipe.ingredients.find(ing => ing.name.toLowerCase() === ingredient.toLowerCase())
    ingredientEl.itHas = !ingredientEl.itHas
    saveRecipes()
}

const removeIngredient = (ingredient) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex(ing => ing.name.toLowerCase() === ingredient.toLowerCase())

    recipe.ingredients.splice(ingredientIndex, 1)

    saveRecipes()
    loadEditPage(recipe.id)
}

loadRecipes()

export { loadRecipes, saveRecipes, getRecipes, createRecipe, removeRecipe, addIngredient, removeIngredient, toggleIngredient, addStep, editSteps, removeStep }
