// api/add-to-basket.js

import { searchGoogleProduct } from './product-search-helpers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { supermarket, credentials, items } = req.body;

  // --- Product Matching ---
  const matchedItems = await Promise.all(items.map(async (item) => {
    const match = await searchGoogleProduct(item, supermarket);
    return {
      ...item,
      matched_product: match ? {
        title: match.title,
        price: match.price,
        link: match.link,
        source: "Google Shopping"
      } : null
    };
  }));

  // --- Simulate "building the basket" (future: real automation) ---
  let basketUrl = "#";
  if (supermarket === "tesco") basketUrl = "https://www.tesco.com/groceries/en-GB/basket";
  if (supermarket === "sainsburys") basketUrl = "https://www.sainsburys.co.uk/gol-ui/Basket";

  res.json({
    status: "simulated",
    message: `Simulated basket created for ${supermarket}`,
    supermarket,
    items: matchedItems,
    basketUrl,
  });
}