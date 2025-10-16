import {TasksController} from "../controllers/tasks.controllers.ts";
import express from 'express';
const taskRouter = express.Router()

const taskController: TasksController = new TasksController()

taskRouter.route("/:id")
    .get(taskController.getTasksByBoardId)
    .post(taskController.postTask)
    .put(taskController.putTask)
    .delete(taskController.deleteTask)

export default taskRouter;