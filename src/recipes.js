import uuid from 'uuid'

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
        title: 'title',
        steps: 'recipe steps',
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
    const index = recipes.findIndex(recipe => recipe.id === recipeId )
    recipes[index].ingredients.push(ingredient)
    saveRecipes()
}


loadRecipes()


export { loadRecipes, saveRecipes, getRecipes, createRecipe, removeRecipe, addIngredient }