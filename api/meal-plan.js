// /api/meal-plan.js

const allMeals = [
  // ... (add more recipes here as you grow)
  {
    day: "Any",
    recipe_name: "Veggie Pasta",
    diet: "vegetarian",
    allergies: ["gluten"],
    ingredients: [
      { name: "penne pasta", amount: 100 }, // base amount per person
      { name: "zucchini", amount: 0.5 },
      { name: "bell pepper", amount: 0.5 },
      { name: "olive oil", amount: 1 },
      { name: "garlic", amount: 1 }
    ],
    nutrition: { calories: 350 },
    description: "Nutritious pasta loaded with veggies.",
    instructions: ["Cook pasta, sauté veggies, combine, season."],
  },
  // ... more meals with different diets, allergens, etc
];

// Supermarket price map (as before, expand for more stores)
const supermarketPrices = {
  "penne pasta": { tesco: { price: 1.0 }, sainsburys: { price: 1.1 } },
  // ...
};

const supermarkets = ["tesco", "sainsburys"];

function getPricesForIngredient(ingredient) {
  const info = supermarketPrices[ingredient.toLowerCase()];
  return supermarkets.reduce((obj, name) => {
    obj[name] = info && info[name] ? info[name] : { price: 1.0 };
    return obj;
  }, {});
}

// Utility: Randomize, filter by dietary/allergy, and scale for family size
function selectMeals(preferences, allergies, householdSize, budget) {
  let filteredMeals = allMeals;

  if (preferences && preferences.length) {
    filteredMeals = filteredMeals.filter(meal =>
      preferences.every(p =>
        meal.diet === p || (Array.isArray(meal.diet) && meal.diet.includes(p))
      )
    );
  }
  if (allergies && allergies.length) {
    filteredMeals = filteredMeals.filter(meal =>
      !meal.allergies || !meal.allergies.some(a => allergies.includes(a))
    );
  }
  // Shuffle and pick 7
  filteredMeals = filteredMeals.sort(() => Math.random() - 0.5).slice(0, 7);

  // Scale ingredients for family size
  filteredMeals = filteredMeals.map(meal => ({
    ...meal,
    ingredients: meal.ingredients.map(ing => ({
      ...ing,
      amount: Math.round(ing.amount * (householdSize || 1))
    }))
  }));

  return filteredMeals;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { dietaryPreferences = [], allergies = [], householdSize = 1, budget = 40 } = req.body;

  let meals = selectMeals(dietaryPreferences, allergies, householdSize, budget);

  const mealsWithPrices = meals.map(meal => {
    const ingredientsWithPrices = meal.ingredients.map(ingredient => ({
      ...ingredient,
      prices: getPricesForIngredient(ingredient.name)
    }));
    // Calculate cost by supermarket
    const cost_by_supermarket = supermarkets.reduce((obj, market) => {
      obj[market] = ingredientsWithPrices.reduce(
        (sum, ing) => sum + (ing.prices[market]?.price || 1.0),
        0
      );
      return obj;
    }, {});
    return { ...meal, ingredients: ingredientsWithPrices, cost_by_supermarket };
  });

  // Weekly totals
  const total_week_cost = supermarkets.reduce((obj, market) => {
    obj[market] = mealsWithPrices.reduce(
      (sum, meal) => sum + meal.cost_by_supermarket[market], 0
    );
    return obj;
  }, {});

  res.status(200).json({
    meals: mealsWithPrices,
    total_week_cost
  });
}
