// Function to convert the response to JSON, throwing an error if the response is not okay
function convertToJson(res) {
  // Check if the response is okay (status code in the range 200-299)
  if (res.ok) {
    // If okay, parse the response body as JSON and return the result
    return res.json();
  } else {
    // If not okay, throw an error with the message "Bad Response"
    throw new Error("Bad Response");
  }
}

// Class representing product data with methods for fetching data and finding a product by ID
export default class ProductData {
  // Constructor takes a category to specify the type of products
  constructor(category) {
    // Set the category and construct the path to the JSON file based on the category
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  // Method to fetch data from the specified JSON file
  getData() {
    // Use the Fetch API to make a network request to the JSON file path
    return fetch(this.path)
      // Call the convertToJson function to handle the response
      .then(convertToJson)
      // Return the parsed JSON data
      .then((data) => data);
  }

  // Asynchronous method to find a product by its ID
  async findProductById(id) {
    // Await the data from the JSON file using the getData method
    const products = await this.getData();
    // Use the Array.find method to locate the product with the specified ID
    return products.find((item) => item.Id === id);
  }
}