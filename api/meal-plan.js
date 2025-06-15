// api/meal-plan.js

// Demo price database for a supermarket (expand as needed)
const supermarketPrices = {
  "penne pasta": { tesco: { price: 1.0, url: "https://tesco.com/product/pasta" } },
  "zucchini": { tesco: { price: 0.5, url: "https://tesco.com/product/zucchini" } },
  "bell pepper": { tesco: { price: 0.6, url: "https://tesco.com/product/bell-pepper" } },
  "olive oil": { tesco: { price: 2.0, url: "https://tesco.com/product/olive-oil" } },
  "garlic": { tesco: { price: 0.3, url: "https://tesco.com/product/garlic" } },
  "chickpeas": { tesco: { price: 0.8, url: "https://tesco.com/product/chickpeas" } },
  "soy sauce": { tesco: { price: 1.2, url: "https://tesco.com/product/soy-sauce" } },
  "onion": { tesco: { price: 0.2, url: "https://tesco.com/product/onion" } },
  "lentils": { tesco: { price: 1.0, url: "https://tesco.com/product/lentils" } },
  "carrot": { tesco: { price: 0.2, url: "https://tesco.com/product/carrot" } },
  "vegetable stock": { tesco: { price: 1.1, url: "https://tesco.com/product/veg-stock" } },
  "celery": { tesco: { price: 0.5, url: "https://tesco.com/product/celery" } },
  "quinoa": { tesco: { price: 1.8, url: "https://tesco.com/product/quinoa" } },
  "cherry tomatoes": { tesco: { price: 1.0, url: "https://tesco.com/product/cherry-tomatoes" } },
  "cucumber": { tesco: { price: 0.7, url: "https://tesco.com/product/cucumber" } },
  "spinach": { tesco: { price: 1.2, url: "https://tesco.com/product/spinach" } },
  "mixed beans": { tesco: { price: 0.9, url: "https://tesco.com/product/mixed-beans" } },
  "tomato passata": { tesco: { price: 1.0, url: "https://tesco.com/product/tomato-passata" } },
  "chili powder": { tesco: { price: 0.5, url: "https://tesco.com/product/chili-powder" } },
  "corn": { tesco: { price: 0.8, url: "https://tesco.com/product/corn" } },
  "bell peppers": { tesco: { price: 0.6, url: "https://tesco.com/product/bell-peppers" } },
  "rice": { tesco: { price: 1.2, url: "https://tesco.com/product/rice" } },
  "tomato": { tesco: { price: 0.7, url: "https://tesco.com/product/tomato" } },
  "mixed herbs": { tesco: { price: 0.7, url: "https://tesco.com/product/herbs" } },
  "pizza dough": { tesco: { price: 1.5, url: "https://tesco.com/product/pizza-dough" } },
  "tomato sauce": { tesco: { price: 0.8, url: "https://tesco.com/product/tomato-sauce" } },
  "mozzarella": { tesco: { price: 1.3, url: "https://tesco.com/product/mozzarella" } },
  "mushrooms": { tesco: { price: 0.9, url: "https://tesco.com/product/mushrooms" } }
};

// Helper: Find price and URL for each ingredient name
function findPrice(ingredientName, supermarket = "tesco") {
  const entry = supermarketPrices[ingredientName.toLowerCase()];
  if (entry && entry[supermarket]) {
    return entry[supermarket];
  }
  return { price: 1.0, url: "#" }; // Fallback
}
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

const meals = [
  {
    day: "Monday",
    recipe_name: "Veggie Pasta",
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
      "Add lentils and stock. Bring to a boil, simmer 30 mins.",
      "Season and serve hot."
    ]
  },
  {
    day: "Thursday",
    recipe_name: "Quinoa Salad",
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
      "Cook quinoa per instructions. Cool.",
      "Chop tomatoes and cucumber.",
      "Combine quinoa, vegetables, and spinach in a bowl.",
      "Drizzle with olive oil. Toss and season."
    ]
  },
  {
    day: "Friday",
    recipe_name: "Bean Chili",
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
      "Add beans (drained), passata, chili, and corn.",
      "Simmer 20 mins, season to taste."
    ]
  },
  {
    day: "Saturday",
    recipe_name: "Stuffed Peppers",
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
      "Mix rice, diced onion and tomato, and herbs. Stuff into peppers.",
      "Place in dish, bake 35 mins."
    ]
  },
  {
    day: "Sunday",
    recipe_name: "Homemade Veggie Pizza",
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

  // Add cost calculation per meal and total, plus product URLs
  let weekTotal = 0;
  const mealsWithCost = meals.map(meal => {
    let cost = 0;
    const ingredientsWithPrice = meal.ingredients.map(ingredient => {
      const { price, url } = findPrice(ingredient.name);
      cost += price;
      return { ...ingredient, price, url };
    });
    weekTotal += cost;
    return {
      ...meal,
      ingredients: ingredientsWithPrice,
      estimated_cost: parseFloat(cost.toFixed(2))
    };
  });

  res.status(200).json({
    meals: mealsWithCost,
    total_week_cost: parseFloat(weekTotal.toFixed(2))
  });
}