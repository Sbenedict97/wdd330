const baseURL = "https://wdd330-backend.onrender.com/";
// const baseURL = "http://server-nodejs.cit.byui.edu:3000/checkout;

//const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

/*
export function getProductsByCategory(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}
*/

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

/*
export async function findProductById(id) {
  const products = await getProductsByCategory();
  return products.find((item) => item.Id === id);
}
*/

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

