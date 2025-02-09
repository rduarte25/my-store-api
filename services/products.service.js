const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    const updatedProduct = { ...this.products[index], ...data };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
