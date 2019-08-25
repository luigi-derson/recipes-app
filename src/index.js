import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { loadRecipes, getRecipes, saveRecipes, createRecipe, removeRecipe, addIngredient } from './recipes'
import { renderRecipes } from './views'

renderRecipes()
const add = document.querySelector('button')
add.addEventListener('click', (e) => {
    if (e) createRecipe()
})


