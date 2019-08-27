import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createRecipe, loadRecipes } from './recipes'
import { renderRecipes } from './views'
import { setFilters } from './filters'

renderRecipes()

const addRecipe = document.querySelector('#add-recipe')
const filterRecipes = document.querySelector('#filter-recipes')

filterRecipes.addEventListener('input', (e) => {
    setFilters({
        searchTitle: e.target.value
    })
    renderRecipes()
})

addRecipe.addEventListener('click', (e) => {
    createRecipe()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        renderRecipes()
    }
})


