// api/meal-plan.js

// Price data for Tesco and Sainsbury's (expand as needed)
const supermarketPrices = {
  "penne pasta": {
    tesco: { price: 1.0, url: "https://tesco.com/product/pasta" },
    sainsburys: { price: 1.1, url: "https://sainsburys.co.uk/product/pasta" }
  },
  "zucchini": {
    tesco: { price: 0.5, url: "https://tesco.com/product/zucchini" },
    sainsburys: { price: 0.6, url: "https://sainsburys.co.uk/product/zucchini" }
  },
  "bell pepper": {
    tesco: { price: 0.6, url: "https://tesco.com/product/bell-pepper" },
    sainsburys: { price: 0.7, url: "https://sainsburys.co.uk/product/bell-pepper" }
  },
  "olive oil": {
    tesco: { price: 2.0, url: "https://tesco.com/product/olive-oil" },
    sainsburys: { price: 2.1, url: "https://sainsburys.co.uk/product/olive-oil" }
  },
  "garlic": {
    tesco: { price: 0.3, url: "https://tesco.com/product/garlic" },
    sainsburys: { price: 0.35, url: "https://sainsburys.co.uk/product/garlic" }
  },
  "chickpeas": {
    tesco: { price: 0.8, url: "https://tesco.com/product/chickpeas" },
    sainsburys: { price: 0.85, url: "https://sainsburys.co.uk/product/chickpeas" }
  },
  "soy sauce": {
    tesco: { price: 1.2, url: "https://tesco.com/product/soy-sauce" },
    sainsburys: { price: 1.3, url: "https://sainsburys.co.uk/product/soy-sauce" }
  },
  "onion": {
    tesco: { price: 0.2, url: "https://tesco.com/product/onion" },
    sainsburys: { price: 0.25, url: "https://sainsburys.co.uk/product/onion" }
  },
  "lentils": {
    tesco: { price: 1.0, url: "https://tesco.com/product/lentils" },
    sainsburys: { price: 1.2, url: "https://sainsburys.co.uk/product/lentils" }
  },
  "carrot": {
    tesco: { price: 0.2, url: "https://tesco.com/product/carrot" },
    sainsburys: { price: 0.25, url: "https://sainsburys.co.uk/product/carrot" }
  },
  "vegetable stock": {
    tesco: { price: 1.1, url: "https://tesco.com/product/veg-stock" },
    sainsburys: { price: 1.15, url: "https://sainsburys.co.uk/product/veg-stock" }
  },
  "celery": {
    tesco: { price: 0.5, url: "https://tesco.com/product/celery" },
    sainsburys: { price: 0.55, url: "https://sainsburys.co.uk/product/celery" }
  },
  "quinoa": {
    tesco: { price: 1.8, url: "https://tesco.com/product/quinoa" },
    sainsburys: { price: 1.9, url: "https://sainsburys.co.uk/product/quinoa" }
  },
  "cherry tomatoes": {
    tesco: { price: 1.0, url: "https://tesco.com/product/cherry-tomatoes" },
    sainsburys: { price: 1.2, url: "https://sainsburys.co.uk/product/cherry-tomatoes" }
  },
  "cucumber": {
    tesco: { price: 0.7, url: "https://tesco.com/product/cucumber" },
    sainsburys: { price: 0.75, url: "https://sainsburys.co.uk/product/cucumber" }
  },
  "spinach": {
    tesco: { price: 1.2, url: "https://tesco.com/product/spinach" },
    sainsburys: { price: 1.25, url: "https://sainsburys.co.uk/product/spinach" }
  },
  "mixed beans": {
    tesco: { price: 0.9, url: "https://tesco.com/product/mixed-beans" },
    sainsburys: { price: 0.95, url: "https://sainsburys.co.uk/product/mixed-beans" }
  },
  "tomato passata": {
    tesco: { price: 1.0, url: "https://tesco.com/product/tomato-passata" },
    sainsburys: { price: 1.1, url: "https://sainsburys.co.uk/product/tomato-passata" }
  },
  "chili powder": {
    tesco: { price: 0.5, url: "https://tesco.com/product/chili-powder" },
    sainsburys: { price: 0.55, url: "https://sainsburys.co.uk/product/chili-powder" }
  },
  "corn": {
    tesco: { price: 0.8, url: "https://tesco.com/product/corn" },
    sainsburys: { price: 0.85, url: "https://sainsburys.co.uk/product/corn" }
  },
  "bell peppers": {
    tesco: { price: 0.6, url: "https://tesco.com/product/bell-peppers" },
    sainsburys: { price: 0.65, url: "https://sainsburys.co.uk/product/bell-peppers" }
  },
  "rice": {
    tesco: { price: 1.2, url: "https://tesco.com/product/rice" },
    sainsburys: { price: 1.3, url: "https://sainsburys.co.uk/product/rice" }
  },
  "tomato": {
    tesco: { price: 0.7, url: "https://tesco.com/product/tomato" },
    sainsburys: { price: 0.8, url: "https://sainsburys.co.uk/product/tomato" }
  },
  "mixed herbs": {
    tesco: { price: 0.7, url: "https://tesco.com/product/herbs" },
    sainsburys: { price: 0.75, url: "https://sainsburys.co.uk/product/herbs" }
  },
  "pizza dough": {
    tesco: { price: 1.5, url: "https://tesco.com/product/pizza-dough" },
    sainsburys: { price: 1.6, url: "https://sainsburys.co.uk/product/pizza-dough" }
  },
  "tomato sauce": {
    tesco: { price: 0.8, url: "https://tesco.com/product/tomato-sauce" },
    sainsburys: { price: 0.85, url: "https://sainsburys.co.uk/product/tomato-sauce" }
  },
  "mozzarella": {
    tesco: { price: 1.3, url: "https://tesco.com/product/mozzarella" },
    sainsburys: { price: 1.35, url: "https://sainsburys.co.uk/product/mozzarella" }
  },
  "mushrooms": {
    tesco: { price: 0.9, url: "https://tesco.com/product/mushrooms" },
    sainsburys: { price: 1.0, url: "https://sainsburys.co.uk/product/mushrooms" }
  }
};

const supermarkets = ["tesco", "sainsburys"];

// Get all prices for an ingredient
function getPricesForIngredient(ingredient) {
  const info = supermarketPrices[ingredient.toLowerCase()];
  return supermarkets.reduce((obj, name) => {
    obj[name] = info && info[name] ? info[name] : { price: 1.0, url: "#" };
    return obj;
  }, {});
}

// Full 7-day meals array
const meals = [
  {
    day: "Monday",
    recipe_name: "Veggie Pasta",
    description: "Nutritious pasta loaded with veggies.",
    ingredients: [
      { name: "penne pasta", amount: "200g" },
      { name: "zucchini", amount: "1 medium" },
      { name: "bell pepper", amount: "1 medium" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "garlic", amount: "2 cloves" }
    ],
    nutrition: {
      calories: 350,
      protein: "10g",
      carbs: "60g",
      fat: "8g",
      fiber: "6g"
    },
    instructions: [
      "Boil the penne pasta according to package instructions. Drain and set aside.",
      "Slice the zucchini and bell pepper. Mince the garlic.",
      "Heat olive oil in a large pan over medium heat. Add garlic and sauté for 1 minute.",
      "Add zucchini and bell pepper. Cook for 5-6 minutes until softened.",
      "Add the cooked pasta to the pan. Toss to combine. Season with salt and black pepper.",
      "Serve hot, garnished with fresh herbs if desired."
    ]
  },
  {
    day: "Tuesday",
    recipe_name: "Chickpea Stir-Fry",
    description: "Quick protein stir-fry with chickpeas and veggies.",
    ingredients: [
      { name: "chickpeas", amount: "1 can (400g)" },
      { name: "bell pepper", amount: "1 medium" },
      { name: "soy sauce", amount: "2 tbsp" },
      { name: "olive oil", amount: "1 tbsp" },
      { name: "onion", amount: "1 small" }
    ],
    nutrition: {
      calories: 320,
      protein: "12g",
      carbs: "54g",
      fat: "6g",
      fiber: "10g"
    },
    instructions: [
      "Drain and rinse chickpeas.",
      "Slice bell pepper and onion.",
      "Heat olive oil in a pan. Add onion, cook until soft.",
      "Add bell pepper, cook 3-4 mins.",
      "Add chickpeas and soy sauce, cook until heated through.",
      "Serve hot."
    ]
  },
  {
    day: "Wednesday",
    recipe_name: "Lentil Soup",
    description: "Hearty lentil soup for midweek comfort.",
    ingredients: [
      { name: "lentils", amount: "150g" },
      { name: "carrot", amount: "2 medium" },
      { name: "onion", amount: "1 large" },
      { name: "vegetable stock", amount: "1 litre" },
      { name: "celery", amount: "2 sticks" }
    ],
    nutrition: {
      calories: 310,
      protein: "14g",
      carbs: "48g",
      fat: "3g",
      fiber: "12g"
    },
    instructions: [
      "Rinse lentils.",
      "Dice carrot, onion, and celery.",
      "Heat oil in a pot, sauté vegetables until soft.",
      "Add lentils and stock. Bring to boil, then simmer 30 mins.",
      "Season and serve hot."
    ]
  },
  {
    day: "Thursday",
    recipe_name: "Quinoa Salad",
    description: "Refreshing salad with quinoa, tomatoes, and greens.",
    ingredients: [
      { name: "quinoa", amount: "150g" },
      { name: "cherry tomatoes", amount: "200g" },
      { name: "cucumber", amount: "1 medium" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "spinach", amount: "50g" }
    ],
    nutrition: {
      calories: 340,
      protein: "9g",
      carbs: "58g",
      fat: "8g",
      fiber: "7g"
    },
    instructions: [
      "Cook quinoa according to package instructions. Let cool.",
      "Chop tomatoes and cucumber.",
      "Combine quinoa, veggies, and spinach in a bowl.",
      "Drizzle with olive oil. Toss and season to taste."
    ]
  },
  {
    day: "Friday",
    recipe_name: "Bean Chili",
    description: "Warming chili made with beans and spices.",
    ingredients: [
      { name: "mixed beans", amount: "1 can (400g)" },
      { name: "tomato passata", amount: "200ml" },
      { name: "chili powder", amount: "1 tsp" },
      { name: "onion", amount: "1 small" },
      { name: "corn", amount: "100g" }
    ],
    nutrition: {
      calories: 330,
      protein: "13g",
      carbs: "56g",
      fat: "4g",
      fiber: "10g"
    },
    instructions: [
      "Dice onion.",
      "Heat oil, sauté onion until translucent.",
      "Add beans (drained), passata, chili powder, and corn.",
      "Simmer for 20 minutes, season to taste."
    ]
  },
  {
    day: "Saturday",
    recipe_name: "Stuffed Peppers",
    description: "Bell peppers stuffed with rice and vegetables.",
    ingredients: [
      { name: "bell peppers", amount: "2 large" },
      { name: "rice", amount: "100g" },
      { name: "onion", amount: "1 small" },
      { name: "tomato", amount: "1 medium" },
      { name: "mixed herbs", amount: "1 tsp" }
    ],
    nutrition: {
      calories: 315,
      protein: "8g",
      carbs: "61g",
      fat: "3g",
      fiber: "8g"
    },
    instructions: [
      "Preheat oven to 180°C.",
      "Cook rice.",
      "Cut tops off peppers, remove seeds.",
      "Mix rice, diced onion, tomato, and herbs. Stuff into peppers.",
      "Place in baking dish, bake 35 mins."
    ]
  },
  {
    day: "Sunday",
    recipe_name: "Homemade Veggie Pizza",
    description: "Easy pizza with vegetables and tomato sauce.",
    ingredients: [
      { name: "pizza dough", amount: "1 base" },
      { name: "tomato sauce", amount: "100g" },
      { name: "mozzarella", amount: "80g" },
      { name: "bell peppers", amount: "1/2 medium" },
      { name: "mushrooms", amount: "3-4" }
    ],
    nutrition: {
      calories: 390,
      protein: "15g",
      carbs: "60g",
      fat: "10g",
      fiber: "5g"
    },
    instructions: [
      "Preheat oven to 200°C.",
      "Spread sauce over pizza base.",
      "Top with cheese, peppers, and mushrooms.",
      "Bake 15 mins until golden."
    ]
  }
];

// Calculate supermarket cost for a single meal
function calculateMealCosts(meal) {
  const supermarketCosts = {};
  supermarkets.forEach(market => {
    let sum = 0;
    meal.ingredients.forEach(ingredient => {
      const prices = getPricesForIngredient(ingredient.name);
      sum += prices[market].price;
    });
    supermarketCosts[market] = parseFloat(sum.toFixed(2));
  });
  return supermarketCosts;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Attach ingredient prices and calculate cost per meal, per supermarket
  const mealsWithDetails = meals.map(meal => {
    const ingredientsWithPrices = meal.ingredients.map(ingredient => {
      const prices = getPricesForIngredient(ingredient.name);
      return { ...ingredient, prices };
    });
    const costBySupermarket = calculateMealCosts(meal);
    return {
      ...meal,
      ingredients: ingredientsWithPrices,
      cost_by_supermarket: costBySupermarket
    };
  });

  // Calculate the week's total basket cost by supermarket
  const totalWeekCost = {};
  supermarkets.forEach(market => {
    totalWeekCost[market] = mealsWithDetails.reduce(
      (sum, meal) => sum + meal.cost_by_supermarket[market], 0
    );
    totalWeekCost[market] = parseFloat(totalWeekCost[market].toFixed(2));
  });

  res.status(200).json({
    meals: mealsWithDetails,
    total_week_cost: totalWeekCost
  });
}
