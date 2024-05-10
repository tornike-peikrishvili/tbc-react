export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products", {
    cache: "force-cache",
  });
  const products = await response.json();
  return products;
}
