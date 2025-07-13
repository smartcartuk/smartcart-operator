// /api/meal-plan.js

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

const SUPERMARKETS = ['tesco', 'sainsburys', 'asda', 'aldi'];

function buildSpoonacularTags(profile) {
  // Lowercase, comma-separated
  return (profile.dietaryPreferences || []).map(tag => tag.toLowerCase()).join(',');
}

function buildSpoonacularIntolerances(profile) {
  // Lowercase, comma-separated
  return (profile.allergies || []).map(tag => tag.toLowerCase()).join(',');
}

async function fetchSpoonacularMeals(userProfile, nMeals = 7) {
  const tags = buildSpoonacularTags(userProfile);
  const intolerances = buildSpoonacularIntolerances(userProfile);

  const url = `https://api.spoonacular.com/recipes/random?number=${nMeals}&tags=${encodeURIComponent(tags)}&intolerances=${encodeURIComponent(intolerances)}&apiKey=${SPOONACULAR_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Spoonacular error: " + res.statusText);
  const data = await res.json();
  return data.recipes || [];
}

async function lookupPricesSerpApi(ingredientName) {
  // We'll return a map supermarket -> {price, url, title}
  const results = {};
  await Promise.all(SUPERMARKETS.map(async (store) => {
    try {
      const res = await fetch(`https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(ingredientName + ' ' + store)}&api_key=${SERPAPI_KEY}`);
      const data = await res.json();
      // Find first valid price in results
      const product = (data.shopping_results || [])[0];
      if (product && product.price) {
        // Parse price like "£1.50"
        let price = product.price.replace(/[^\d.]/g, '');
        results[store] = {
          price: parseFloat(price) || 2.50, // fallback
          url: product.link,
          title: product.title
        };
      } else {
        results[store] = { price: 2.50, url: '', title: 'No match' };
      }
    } catch (err) {
      results[store] = { price: 2.50, url: '', title: 'API error' };
    }
  }));
  return results;
}

function getDayName(idx) {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return days[idx % 7];
}

function scaleAmount(amount, householdSize) {
  // A very naive scaling: "200g" -> (200 * householdSize) + "g"
  const match = /^(\d+(?:\.\d+)?)([a-zA-Z ]+)$/.exec(amount);
  if (!match) return amount;
  const value = parseFloat(match[1]);
  const unit = match[2];
  return (value * householdSize) + unit;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { userProfile } = req.body || {};
    if (!userProfile) throw new Error("Missing userProfile");

    const householdSize = userProfile.householdSize || 1;
    const budget = userProfile.weeklyBudget || 50;

    // Step 1: Get 7 random recipes
    const mealsRaw = await fetchSpoonacularMeals(userProfile, 7);

    // Step 2: For each recipe, lookup prices for ingredients
    const mealPlan = [];
    let totalWeekCost = { tesco: 0, sainsburys: 0, asda: 0, aldi: 0 };

    for (let i = 0; i < mealsRaw.length; ++i) {
      const spoonMeal = mealsRaw[i];
      // Limit ingredients for pricing (to avoid rate limits)
      const mainIngredients = (spoonMeal.extendedIngredients || []).slice(0, 4);

      const ingredients = await Promise.all(mainIngredients.map(async (ing) => {
        const scaledAmount = scaleAmount(ing.amount + (ing.unitShort || ''), householdSize);
        const prices = await lookupPricesSerpApi(ing.nameClean || ing.name);
        return {
          name: ing.nameClean || ing.name,
          amount: scaledAmount,
          prices
        };
      }));

      // Compute cost_by_supermarket
      const cost_by_supermarket = {};
      SUPERMARKETS.forEach(store => {
        cost_by_supermarket[store] = ingredients.reduce((sum, ing) => sum + (ing.prices[store]?.price || 0), 0);
        totalWeekCost[store] += cost_by_supermarket[store];
      });

      mealPlan.push({
        day: getDayName(i),
        recipe_name: spoonMeal.title,
        description: spoonMeal.summary ? spoonMeal.summary.replace(/<[^>]+>/g, '') : "",
        ingredients,
        nutrition: spoonMeal.nutrition || null,
        instructions: (spoonMeal.analyzedInstructions?.[0]?.steps || []).map(s => s.step) || [],
        cost_by_supermarket,
        image: spoonMeal.image || '',
        estimated_cost: Math.min(...Object.values(cost_by_supermarket)),
      });
    }

    // Round totalWeekCost
    Object.keys(totalWeekCost).forEach(k => {
      totalWeekCost[k] = Math.round((totalWeekCost[k] + Number.EPSILON) * 100) / 100;
    });

    res.status(200).json({
      meals: mealPlan,
      total_week_cost: totalWeekCost
    });

  } catch (err) {
    console.error('Meal plan error:', err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
