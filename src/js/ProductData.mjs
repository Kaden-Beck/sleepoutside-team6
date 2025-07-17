const baseURL = "https://wdd330-backend.onrender.com/";

console.log("baseURL:", baseURL);


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.text().then(text => {
      console.error("Bad response:", text);
      throw new Error('Bad Response');
    });
  }
}


export default class ProductData {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(`/json/${category}.json`);
    const data = await convertToJson(response);

    return Array.isArray(data) ? data : data.Result;
  }
  // async getData(category) {
  //   const response = await fetch(`/src/public/json/${category}.json`);
  //   const data = await convertToJson(response);

  //   return data;
  // }
  async findProductById(id, category) {
    console.log("Fetching product from:", `${baseURL}product/${id}`);

    const response = await fetch(`/json/${category}.json`);
    const data = await convertToJson(response);
    const products = Array.isArray(data) ? data : data.Result;
    return products.find(product => product.Id === id);
  }
}