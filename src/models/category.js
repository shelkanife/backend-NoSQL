const CosmosClient = require("@azure/cosmos").CosmosClient;

let partitionKey = undefined;
class Category {
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.containerId = containerId;

    this.database = null;
    this.container = null;
  }
  async init() {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId,
    });
    this.database = dbResponse.database;
    const contResponse = await this.database.containers.createIfNotExists({
      id: this.containerId,
    });
    this.container = contResponse.container;
  }
  async getAllItems() {
    const query = {
      query: "SELECT * FROM Items",
    };
    if (!this.container) {
      throw new Error("Contanier does not initialized");
    }
    const { resources } = await this.container.items.query(query).fetchAll();
    return resources;
  }

  async find(querySpec) {
    if (!this.container) {
      throw new Error("Contanier does not initialized");
    }
    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();
    return resources;
  }

  async addItem(item) {
    item.date = Date.now();
    const { recurso: doc } = await this.container.items.create(item);
    return doc;
  }

  async updateItem(itemId) {
    const doc = await this.getItem(itemId);
    doc.completed = true;

    const { resource: replaced } = await this.container
      .item(itemId, partitionKey)
      .replace(doc);
    return replaced;
  }

  async getItem(itemId) {
    const { resource } = await this.container.item(itemId, partitionKey).read();
    return resource;
  }
}

module.exports = Category;
