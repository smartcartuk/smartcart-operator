// api/meal-plan.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

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
      instructions: [
        "Boil pasta according to package instructions. Drain and set aside.",
        "Slice zucchini and bell pepper. Mince garlic.",
        "Heat olive oil in a pan. Add garlic and sauté 1 min.",
        "Add zucchini and bell pepper, cook until soft.",
        "Add pasta to pan, toss to combine. Season with salt/pepper."
      ],
      nutrition: { calories: 350, protein: "10g", carbs: "60g", fat: "8g", fiber: "6g" },
      estimated_cost: 4.25
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
      instructions: [
        "Drain and rinse chickpeas.",
        "Slice bell pepper and onion.",
        "Heat oil in a pan. Add onion, cook until soft.",
        "Add bell pepper, cook 3-4 mins.",
        "Add chickpeas and soy sauce, cook until heated through."
      ],
      nutrition: { calories: 320, protein: "12g", carbs: "54g", fat: "6g", fiber: "10g" },
      estimated_cost: 4.00
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
      instructions: [
        "Rinse lentils.",
        "Dice carrot, onion, celery.",
        "Heat oil in pot, sauté veg until soft.",
        "Add lentils, stock. Bring to boil, simmer 30 mins.",
        "Season and serve hot."
      ],
      nutrition: { calories: 310, protein: "14g", carbs: "48g", fat: "3g", fiber: "12g" },
      estimated_cost: 3.50
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
      instructions: [
        "Cook quinoa per instructions. Cool.",
        "Chop tomatoes and cucumber.",
        "Combine quinoa, veg, and spinach in a bowl.",
        "Drizzle with olive oil. Toss and season."
      ],
      nutrition: { calories: 340, protein: "9g", carbs: "58g", fat: "8g", fiber: "7g" },
      estimated_cost: 4.10
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
      instructions: [
        "Dice onion.",
        "Heat oil, sauté onion until translucent.",
        "Add beans (drained), passata, chili, and corn.",
        "Simmer 20 mins, season to taste."
      ],
      nutrition: { calories: 330, protein: "13g", carbs: "56g", fat: "4g", fiber: "10g" },
      estimated_cost: 4.00
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
      instructions: [
        "Preheat oven to 180°C.",
        "Cook rice.",
        "Cut tops off peppers, remove seeds.",
        "Mix rice, diced onion/tomato, and herbs. Stuff into peppers.",
        "Place in dish, bake 35 mins."
      ],
      nutrition: { calories: 315, protein: "8g", carbs: "61g", fat: "3g", fiber: "8g" },
      estimated_cost: 4.50
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
      instructions: [
        "Preheat oven to 200°C.",
        "Spread sauce over pizza base.",
        "Top with cheese, peppers, and mushrooms.",
        "Bake 15 mins until golden."
      ],
      nutrition: { calories: 390, protein: "15g", carbs: "60g", fat: "10g", fiber: "5g" },
      estimated_cost: 5.00
    }
  ];

  res.status(200).json({ meals });
}