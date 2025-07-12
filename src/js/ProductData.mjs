import tents from '../json/tents.json'

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    
  }
  getData() {
    return Promise.resolve(tents);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => String(item.Id).toLowerCase() === String(id).toLowerCase());
  }
}