// api/meal-plan.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const body = req.body || {};
  const { preferences, userProfile } = body;

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
    {
      day: "Thursday",
      recipe_name: "Quinoa Salad",
      description: "Refreshing salad with quinoa, tomatoes, and greens.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["quinoa", "tomato", "spinach", "olive oil"],
      instructions: "Cook quinoa. Toss with veggies and dressing.",
      estimated_cost: 4.10
    },
    {
      day: "Friday",
      recipe_name: "Bean Chili",
      description: "Warming chili made with beans and spices.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["beans", "tomato", "chili powder", "onion"],
      instructions: "Simmer all ingredients until thick.",
      estimated_cost: 4.00
    },
    {
      day: "Saturday",
      recipe_name: "Stuffed Peppers",
      description: "Bell peppers stuffed with rice and vegetables.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["bell peppers", "rice", "tomato", "herbs"],
      instructions: "Stuff peppers, bake until tender.",
      estimated_cost: 4.50
    },
    {
      day: "Sunday",
      recipe_name: "Homemade Veggie Pizza",
      description: "Easy pizza with vegetables and tomato sauce.",
      picture_url: "https://placehold.co/400x300",
      ingredients: ["pizza dough", "tomato sauce", "mozzarella", "veggies"],
      instructions: "Top dough, bake until golden.",
      estimated_cost: 5.00
    }
  ];

  res.status(200).json({ meals });
}
