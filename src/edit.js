import { loadRecipes, saveRecipes, removeRecipe, addIngredient, addStep, getRecipes } from './recipes'
import { loadEditPage, test } from './views'

const recipeTitle = document.querySelector('#recipe-title'),
    previousRecipe = document.querySelector('#previous-recipe'),
    nextRecipe = document.querySelector('#next-recipe'),
    recipeDescription = document.querySelector('#recipe-description'),
    recipeSteps = document.querySelector('#add-step'),
    addIngredientForm = document.querySelector('#add-ingredient'),
    removeRecipeButton = document.querySelector('#remove-recipe')

    const recipeId = location.hash.substring(1)
    const recipe = loadEditPage(recipeId)

previousRecipe.addEventListener('click', () => {
    /* location.assign(`/edit.html#0885bebe-ebee-4bc9-bfb9-72bda1652732`)
    loadEditPage("0885bebe-ebee-4bc9-bfb9-72bda1652732") */
})

nextRecipe.addEventListener('click', () => {
    /* location.assign(`/edit.html#ca8e3707-fec2-4f68-9fc6-69be7962f868`)
    loadEditPage('ca8e3707-fec2-4f68-9fc6-69be7962f868') */
})

recipeTitle.addEventListener('input', (e) => {
    recipe.title = e.target.value
    saveRecipes()
})

// Auto resize textarea
const textArea = document.getElementsByTagName('textarea');
for (var i = 0; i < textArea.length; i++) {
  textArea[i].setAttribute('style', 'height:' + (textArea[i].scrollHeight) + 'px;overflow-y:hidden;');
  textArea[i].addEventListener("input", OnInput, false);
}

function OnInput(e) {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}
// End of fuction

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

