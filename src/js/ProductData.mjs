import { convertToJson } from "./utils.mjs";

import tents from '../json/tents.json'

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