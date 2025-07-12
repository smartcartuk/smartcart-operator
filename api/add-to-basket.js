import { searchGoogleProduct } from "./product-search-helpers";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { supermarket, credentials, items } = req.body;

  // Go through each item and try to find a product match using Google Shopping
  const matchedItems = await Promise.all(
    (items || []).map(async item => {
      const matched_product = await searchGoogleProduct(item, supermarket);
      return { ...item, matched_product };
    })
  );

  // Simulate "building the basket"
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
