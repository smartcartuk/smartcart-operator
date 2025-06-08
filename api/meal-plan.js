// api/meal-plan.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { preferences, userProfile } = req.body;

  // Sample static meal plan
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

  res.status(200).json({ meals });
}
