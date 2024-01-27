// Importing the baseURL from environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

// Function to convert response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json(); // If response is okay, return JSON data
  } else {
    throw new Error("Bad Response"); // Throw error if response is not okay
  }
}

// Class definition for ProductData
export default class ProductData {
  constructor(category) {
    // Constructor not being used currently
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  // Method to fetch data for a specific category
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`); // Fetch data from the server using baseURL and category
    const data = await convertToJson(response); // Convert response to JSON using helper function
    return data.Result; // Return the result data
  }

  // Method to find product by ID
  async findProductById(id) {
    const products = await this.getData(); // Get products data
    return products.find((item) => item.Id === id); // Find product by ID in the products data
  }
}



