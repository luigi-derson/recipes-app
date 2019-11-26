// Not used
class Recipe {
  constructor(id, title, description, steps = [], ingredients = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.steps = steps;
    this.ingredients = ingredients;
  }

  addSteps(step) {
    this.steps.push({
      text: step,
      done: false
    });
  }

  removeSteps(stepStr) {
    const stepIndex = this.steps.findIndex(step => step.text === stepStr);
    this.steps.splice(stepIndex, 1);
  }

  renderStep(stepStr) {
    const stepIndex = this.steps.findIndex(step => step.text === stepStr);
    return `#${stepIndex + 1} - ${stepStr}`;
  }

  addIngredients(ingredient) {
    this.ingredients.push({
      id: 0,
      name: ingredient,
      itHas: false
    });
  }
}

const recipe = new Recipe("123", "my recipe", "good");
recipe.addSteps("Cock the rice");
recipe.addSteps("Add cup of water");
recipe.addSteps("Eat happy");

recipe.addIngredients("cucumber");
recipe.addIngredients("letuce");

recipe.removeSteps("Cock the rice");

const arroz = new Recipe("000", "arroz al horno", "tipical spanish");

console.log(recipe);

//console.log(arroz)
