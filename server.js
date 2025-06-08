const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/meal-plan', (req, res) => {
  const { preferences, userProfile } = req.body;

  // Simple static meal plan for testing
  const meals = [
    {
      day: "Monday",
      recipe_name: "Test Veggie Pasta",
      description: "Nutritious pasta for demo",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["pasta", "zucchini", "olive oil"],
      instructions: "Cook pasta. Sauté veggies. Mix.",
      estimated_cost: 4.25
    }
  ];

  res.json({ meals });
});

app.listen(3000, () => {
  console.log('Operator listening on http://localhost:3000/api/meal-plan');
});