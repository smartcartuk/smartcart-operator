// /api/meal-plan.js

const SPOONACULAR_API_KEY = "79d935a7f54d4c639a511872383bb0e4";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Helper to fetch recipes from Spoonacular
async function fetchRecipesFromSpoonacular({ diet, allergies, householdSize }) {
  const intolerances = allergies && allergies.length > 0 ? `&intolerances=${allergies.join(',')}` : "";
  const dietParam = diet ? `&diet=${diet}` : "";
  const url = `https://api.spoonacular.com/recipes/complexSearch?number=7${dietParam}${intolerances}&addRecipeInformation=true&fillIngredients=true&apiKey=${SPOONACULAR_API_KEY}`;

  const resp = await fetch(url);
  if (!resp.ok) return null;
  const data = await resp.json();
  if (!data.results || data.results.length === 0) return null;

  // Map Spoonacular recipes to SmartCart structure
  return data.results.slice(0, 7).map((result, idx) => ({
    day: daysOfWeek[idx] || "",
    recipe_name: result.title,
    description: result.summary?.replace(/<[^>]+>/g, '') || "", // Remove HTML
    image: result.image,
    ingredients: result.extendedIngredients.map(ing => ({
      name: ing.name,
      amount: `${ing.amount * (householdSize || 2)} ${ing.unit}` // Scale to household size
    })),
    nutrition: {}, // Spoonacular provides nutrition on detail call (optional)
    instructions: result.analyzedInstructions?.[0]?.steps.map(step => step.step) || [],
  }));
}

// Fallback: hardcoded/AI recipes
function getFallbackMeals({diet}) {
  // Reuse your old fallback logic or use previous static meals array
  return [
    /* ...your existing fallback meals array here... */
  ];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Extract user preferences from request
  const { dietaryPreferences, allergies, householdSize, budget } = req.body;

  // 1. Try Spoonacular
  try {
    const recipes = await fetchRecipesFromSpoonacular({
      diet: (dietaryPreferences && dietaryPreferences[0]) || "",
      allergies: allergies || [],
      householdSize: householdSize || 2,
      budget
    });
    if (recipes && recipes.length > 0) {
      res.status(200).json({
        meals: recipes,
        // Optionally, add ingredient prices here using your supermarket logic
        total_week_cost: {} // Placeholder, add calculation if needed
      });
      return;
    }
  } catch (err) {
    // Log but continue to fallback
    console.error("Spoonacular error", err);
  }

  // 2. Fallback to static/AI-generated meal plan
  const fallbackMeals = getFallbackMeals({diet: (dietaryPreferences && dietaryPreferences[0]) || ""});
  res.status(200).json({
    meals: fallbackMeals,
    total_week_cost: {}
  });
}
