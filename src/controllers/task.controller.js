const { taskList, category } = require("../config/containers");

renderShow = async (req, res) => {
  const categories = await category.getAllItems();
  const tasks = await taskList.showTask();

  return res.render("index", {
    title: "My list",
    tasks,
    categories,
  });
};

addTask = async (req, res) => {
  const item = req.body;
  await taskList.addTask(item);
  res.redirect("/");
};

completeTask = async (req, res) => {
  const completedTask = Object.keys(req.body);
  await taskList.completedTask(completedTask);
  res.redirect("/");
};

module.exports = {
  renderShow,
  addTask,
  completeTask,
};
