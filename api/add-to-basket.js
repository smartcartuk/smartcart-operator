// api/add-to-basket.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Get data from the Lovable POST request
  const { supermarket, credentials, items } = req.body;

  // --- Simulate "building the basket" ---
  // (In future, real automation will go here)
  let basketUrl = "#";
  if (supermarket === "tesco") basketUrl = "https://www.tesco.com/groceries/en-GB/basket";
  if (supermarket === "sainsburys") basketUrl = "https://www.sainsburys.co.uk/gol-ui/Basket";

  res.json({
    status: "simulated",
    message: `Simulated basket created for ${supermarket}`,
    supermarket,
    items,
    basketUrl,
  });
}