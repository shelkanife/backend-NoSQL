const config = {};
config.host = process.env.HOST;
config.authKey = process.env.AUTHKEY;
config.databaseId = "ToDoList";
config.containerId = "Items";

if (config.host.includes("//localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
module.exports = config;
