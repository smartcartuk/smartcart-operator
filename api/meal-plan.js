// api/meal-plan.js

export default function handler(req, res) {
  const { preferences, userProfile } = req.body;

  const meals = [
    {
      day: "Monday",
      recipe_name: "Veggie Pasta",
      description: "Nutritious pasta with veggies.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["pasta", "zucchini", "olive oil"],
      instructions: "Cook pasta. Sauté veggies. Mix.",
      estimated_cost: 4.25
    },
    {
      day: "Tuesday",
      recipe_name: "Chickpea Stir Fry",
      description: "A quick stir fry with chickpeas.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["chickpeas", "carrot", "broccoli", "soy sauce"],
      instructions: "Sauté everything. Enjoy.",
      estimated_cost: 4.00
    },
    // ...and so on for each day!
  ];

  res.status(200).json({ meals });
}
