const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.get("/", taskController.renderShow);
router.post("/add", taskController.addTask);
router.post("/complete", taskController.completeTask);

module.exports = router;
