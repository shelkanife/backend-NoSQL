const CosmosClient_ = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const TaskList = require("../models/taskList");
const Task = require("../models/task");
const Category = require("../models/category");

const cosmosClient = new CosmosClient_({
  endpoint: config.host,
  key: config.authKey,
});

const task = new Task(cosmosClient, config.databaseId, config.containerId);
const category = new Category(cosmosClient, config.databaseId, "Categories");
const taskList = new TaskList(task);
task
  .init((err) => console.log(err))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
category
  .init((err) => console.log(err))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = {
  task,
  category,
  taskList,
};
