const express = require("express");
const taskControllers = require("../controllers/task");
const middleware = require("../middleware/auth");
const router = express.Router();

router.post("/task/create",middleware.authorization, taskControllers.createTask);

router.get("/task/all",middleware.authorization, taskControllers.allTask);

router.get("/task",taskControllers.taskPage);

router.post("/task/edit/:id",middleware.authorization, taskControllers.editTask);

router.get("/task/delete/:id",middleware.authorization, taskControllers.deleteTask);

router.get("/task/admin",middleware.authorization, taskControllers.adminReq);

module.exports = router;