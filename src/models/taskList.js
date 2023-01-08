const Task = require("./task");

class TaskList {
  constructor(task) {
    this.task = task;
  }
  async showTask(req, res) {
    const query = {
      query: "SELECT * FROM Items",
      parameters: [
        {
          name: "@completed",
          value: false,
        },
      ],
    };
    const items = await this.task.find(query);
    // res.render("index", {
    //   title: "Mi lista",
    //   tasks: items,
    // });
    return items;
  }
  async addTask(item) {
    await this.task.addItem(item);
  }

  async completedTask(completedTask) {
    const tasks = [];
    completedTask.forEach((task) => {
      tasks.push(this.task.updateItem(task));
    });
    await Promise.all(tasks);
  }
}

module.exports = TaskList;
