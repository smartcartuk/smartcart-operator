// api/meal-plan.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Defensive: support both Vercel and local dev
  const body = req.body || {};
  const { preferences, userProfile } = body;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = days.map((day, i) => ({
    day,
    recipe_name: `Test Meal ${i + 1}`,
    description: `This is a test meal for ${day}.`,
    picture_url: "https://placehold.co/400x300",
    ingredients: [`ingredient${i + 1}a`, `ingredient${i + 1}b`],
    instructions: `Instructions for ${day}.`,
    estimated_cost: 5.00 + i,
  }));

  res.status(200).json({ meals });
}