// api/product-search-helpers.js

export async function searchGoogleProduct(item, supermarket) {
  const SERPAPI_KEY = process.env.SERPAPI_KEY; // Add to your Vercel env vars!

  // Build the search query
  const query = `${item.name} ${supermarket} groceries`;

  // Build the API URL
  const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    // Look for products that match the supermarket site
    const products = (data.shopping_results || []).filter(product =>
      product.link && product.link.includes(supermarket)
    );
    // Return first match or fallback to first product
    return products[0] || data.shopping_results[0] || null;
  } catch (e) {
    return null;
  }
}