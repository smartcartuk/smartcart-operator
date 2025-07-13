// /api/meal-plan.js

const SPOONACULAR_API_KEY = '79d935a7f54d4c639a511872383bb0e4';
const SERPAPI_KEY = '52d217826ca9bd2e027e15ba2f1f27e463d263f3388c0172572f8b3231aa0f56';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const supermarkets = [
  { name: "tesco", search: "Tesco UK" },
  { name: "sainsburys", search: "Sainsbury's UK" },
  { name: "asda", search: "Asda UK" },
  { name: "aldi", search: "Aldi UK" },
];

// --------- Helper Functions ---------

async function fetchSpoonacularRecipes(userProfile, numMeals = 7) {
  // Build query params
  const diet = userProfile.dietaryPreferences?.join(',') || '';
  const intolerances = userProfile.allergies?.join(',') || '';
  // We'll use 'random recipes' endpoint as Spoonacular does not natively support full week plans per UK market
  // For full plans, you could try 'meal planner' but requires more setup.
  const url = `https://api.spoonacular.com/recipes/random?number=${numMeals}&tags=${encodeURIComponent(diet)}&intolerances=${encodeURIComponent(intolerances)}&apiKey=${SPOONACULAR_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Spoonacular error: " + await res.text());
  const data = await res.json();
  return data.recipes || [];
}

async function lookupPricesGoogleShopping(ingredient) {
  const results = {};
  for (const { name: supermarket, search } of supermarkets) {
    const q = `${ingredient} ${search}`;
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&gl=uk&hl=en&api_key=${SERPAPI_KEY}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      // Find first matching product with price
      const first = data.shopping_results?.find(item => item.price) || null;
      if (first) {
        let priceValue = parseFloat((first.price || '').replace(/[£$€,]/g, ''));
        if (isNaN(priceValue)) priceValue = 2.5;
        results[supermarket] = {
          price: priceValue,
          url: first.link || '',
        };
      } else {
        results[supermarket] = { price: 2.5, url: '', noMatch: true };
      }
    } catch (err) {
      results[supermarket] = { price: 2.5, url: '', noMatch: true };
    }
  }
  return results;
}

// --------- Main API Handler ---------

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { userProfile } = req.body || {};
  if (!userProfile) {
    res.status(400).json({ error: "Missing userProfile" });
    return;
  }

  try {
    // 1. Get 7 meals from Spoonacular
    const spoonMeals = await fetchSpoonacularRecipes(userProfile, 7);

    // 2. Map to output structure (with prices, nutrition, etc)
    const mealsWithPrices = await Promise.all(spoonMeals.map(async (spoonMeal, i) => {
      const day = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ][i % 7];

      // Get all unique ingredient names for price lookups
      const ingredientObjects = (spoonMeal.extendedIngredients || []).map(ing => ({
        name: ing.nameClean || ing.name || "",
        amount: ing.original || "",
      }));

      // For each ingredient, get prices
      const ingredientsWithPrices = await Promise.all(
        ingredientObjects.map(async (ing) => {
          if (!ing.name) return null;
          const prices = await lookupPricesGoogleShopping(ing.name);
          return {
            ...ing,
            prices
          };
        })
      );

      // Calculate cost per supermarket
      const cost_by_supermarket = {};
      for (const { name: supermarket } of supermarkets) {
        cost_by_supermarket[supermarket] =
          ingredientsWithPrices.reduce((sum, ing) => sum + (ing?.prices?.[supermarket]?.price || 2.5), 0);
        cost_by_supermarket[supermarket] = Number(cost_by_supermarket[supermarket].toFixed(2));
      }

      return {
        day,
        recipe_name: spoonMeal.title,
        description: spoonMeal.summary ? spoonMeal.summary.replace(/<[^>]+>/g, '') : "",
        ingredients: ingredientsWithPrices.filter(Boolean),
        instructions: Array.isArray(spoonMeal.analyzedInstructions) && spoonMeal.analyzedInstructions.length > 0
          ? spoonMeal.analyzedInstructions[0].steps.map(step => step.step)
          : [spoonMeal.instructions || "No instructions"],
        nutrition: spoonMeal.nutrition || {}, // Spoonacular only includes this for certain calls
        picture_url: spoonMeal.image || "",
        cost_by_supermarket
      };
    }));

    // 3. Calculate total week cost per supermarket
    const total_week_cost = {};
    for (const { name: supermarket } of supermarkets) {
      total_week_cost[supermarket] = mealsWithPrices.reduce(
        (sum, meal) => sum + (meal.cost_by_supermarket[supermarket] || 0), 0
      );
      total_week_cost[supermarket] = Number(total_week_cost[supermarket].toFixed(2));
    }

    res.status(200).json({
      meals: mealsWithPrices,
      total_week_cost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Meal plan generation failed.", details: error.message });
  }
}
