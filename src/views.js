import { getRecipes, toggleIngredient, removeIngredient, removeStep } from './recipes'
import { getFilters } from './filters'


const renderRecipes = () => {
    const recipesList = document.querySelector('#recipes-list')
    const {searchTitle} = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTitle.toLowerCase()))

    recipesList.innerHTML = ''
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => recipesList.appendChild(generateRecipeToDOM(recipe)))
    } else {
        recipesList.innerHTML = 'There are not recipes to show, create a new one!'
    }
    
}

const renderSteps = (recipe) => {
    const orderedList = document.querySelector('#recipe-steps'),
    editStepsButton = document.querySelector('#edit-steps-button')

    orderedList.innerHTML = ''

    if (recipe.steps.length > 0) {
        recipe.steps.forEach((step) => {
            orderedList.appendChild(generateStepToDOM(step))
        })
        editStepsButton.style.display = ''
    } else {
        orderedList.innerHTML = 'No steps yet'
        editStepsButton.style.display = 'none'
    }
}

const renderIngredients = (recipe) => {
    const recipeIngredients = document.querySelector('#ingredients-list')
    
    recipeIngredients.innerHTML = ''
    
    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach(ingredient => recipeIngredients.appendChild(generateIngredientsToDOM(ingredient)))
    } else {
        recipeIngredients.innerHTML = 'No ingredients yet, add them!'
    }
}

const generateRecipeToDOM = (recipe) => {
    const recipeWrap = document.createElement('a')
    const recipeCard = document.createElement('div')
    const recipeTitle = document.createElement('span')
    const recipeDescription = document.createElement('p')
    const recipeIngredients = document.createElement('div')

    const ingredientsWeHave = recipe.ingredients.filter(ingredient => ingredient.itHas === true)
    const ingredientsCounter = ingredientsWeHave.length !== recipe.ingredients.length ? `You have ${ingredientsWeHave.length} of ${recipe.ingredients.length} ingredients` : 'You have all the ingredients'

    recipeCard.classList.add('recipe-card')

    recipeTitle.textContent = recipe.title
    recipeTitle.classList.add('recipe-title')
    recipeCard.appendChild(recipeTitle)

    const maxChAllowed = 68 //It depends on design

    if (recipe.description.length > maxChAllowed) {
        let result = ''
        for (let i = 0; i < 68; i++) {
            result += recipe.description[i]
        }
        recipeDescription.textContent = `${result}...`
    } else {
        recipeDescription.textContent = recipe.description
    }

    recipeDescription.classList.add('recipe-description')
    recipeCard.appendChild(recipeDescription)

    if (ingredientsWeHave.length > 0) {
        recipeIngredients.textContent = ingredientsCounter
    } else {
        recipeIngredients.textContent = 'You don\'t have any ingredient yet'
    }
    recipeIngredients.classList.add('recipe-ingredients')
    recipeCard.appendChild(recipeIngredients)

    recipeWrap.appendChild(recipeCard)
    recipeWrap.setAttribute('href', `/edit.html#${recipe.id}`)
    
    return recipeWrap
}

const generateStepToDOM = (step) => {
    const stepElement = document.createElement('li')
    const remove = document.createElement('div')
    remove.textContent = 'x'
    //remove.setAttribute('disabled', 'true')
    stepElement.textContent = step
    stepElement.appendChild(remove)

    remove.addEventListener('click', () => {
        removeStep(step)
    })

    return stepElement
}

const generateIngredientsToDOM = (ingredient) => {
    const containerEl = document.createElement('div')
    const checkEl = document.createElement('input')
    const textEl = document.createElement('span')
    const removeEl = document.createElement('button')

    checkEl.setAttribute('type', 'checkbox')
    checkEl.checked = ingredient.itHas
    containerEl.appendChild(checkEl)
    checkEl.addEventListener('change', () => {
        toggleIngredient(ingredient.name)
    })

    textEl.textContent = ingredient.name
    containerEl.appendChild(textEl)

    removeEl.textContent = 'remove'
    containerEl.appendChild(removeEl)
    removeEl.addEventListener('click', () => {
        removeIngredient(ingredient.name)
    })

    return containerEl 
}

const loadEditPage = (recipeId) => {
    const recipeTitle = document.querySelector('#recipe-title')
    const recipeDescription = document.querySelector('#recipe-description')

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    recipeTitle.value = recipe.title
    recipeDescription.value = recipe.description

    renderSteps(recipe)
    renderIngredients(recipe)

    return recipe
}


export { renderRecipes, loadEditPage, renderIngredients, renderSteps }