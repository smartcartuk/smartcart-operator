// api/meal-plan.js

const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/meal-plan', (req, res) => {
  const { preferences, userProfile } = req.body;

  // Unique meals for each day
  const meals = [
    {
      day: "Monday",
      recipe_name: "Veggie Pasta",
      description: "Nutritious pasta loaded with veggies.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["pasta", "zucchini", "olive oil"],
      instructions: "Cook pasta. Sauté veggies. Mix.",
      estimated_cost: 4.25
    },
    {
      day: "Tuesday",
      recipe_name: "Chickpea Stir-Fry",
      description: "Quick protein stir-fry with chickpeas and veggies.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["chickpeas", "bell pepper", "soy sauce"],
      instructions: "Stir fry veggies. Add chickpeas and sauce.",
      estimated_cost: 4.00
    },
    {
      day: "Wednesday",
      recipe_name: "Lentil Soup",
      description: "Hearty lentil soup for midweek comfort.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["lentils", "carrot", "onion", "stock"],
      instructions: "Simmer all ingredients until soft.",
      estimated_cost: 3.80
    },
    // ...add more for Thursday, Friday, Saturday, Sunday
  ];

  res.json({ meals });
});

app.listen(3000, () => {
  console.log('Operator listening on http://localhost:3000/api/meal-plan');
});