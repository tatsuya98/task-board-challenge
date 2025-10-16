import {validateId} from "../utils.ts";
import type {NextFunction, Request, Response} from "express";
import type {Task, TaskToInsert, TaskToUpdate} from "../../types.ts";
import {TaskModel} from "../models/tasks.models.ts";
import pool from "../database/connection.ts";
import {CustomError} from "../errorHandling/ErrorHandler.ts";

export class TasksController {
    private taskModel: TaskModel;

    constructor() {
        this.taskModel = new TaskModel();
    }

    public getTasksByBoardId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const {id} = req.params;
            if(!validateId(id)) {
                throw new CustomError(400, "id must be a valid UUID");
            }
            const fetchedTasks: Task[] = await this.taskModel.fetchTasksByBoardId(id);
            res.status(200).json({tasks: fetchedTasks});
        }catch(error){
            next(error)
        }
    }

    public postTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const {id} = req.params;
            const taskToInsert: TaskToInsert = req.body;

            if(!validateId(id)) {
                throw new CustomError(400, "id must be a valid UUID");
            }
            if(!this.validateTaskData(taskToInsert)){
                throw new CustomError(400, "one or more fields is missing");
            }
            await this.taskModel.createTask(taskToInsert, id)
            res.status(201).send("Task created successfully.");
        }catch (error){
            next(error)
        }
    }

    public putTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const {id} = req.params;
            if(!validateId(id)) {
                throw new CustomError(400, "id must be a valid UUID");
            }
            if(!await this.checkTaskIdExists(id)){
                throw new CustomError(404, "task id does not exist");
            }
            const taskToUpdate: TaskToUpdate = req.body;
            await this.taskModel.updateTask(taskToUpdate, id);
            res.status(201).send("Task updated successfully.");
        }catch(error){
            next(error)
        }
    }

    public deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {id} = req.params;
            if(!validateId(id)) {
                throw new CustomError(400, "id must be a valid UUID");
            }
            if(!await this.checkTaskIdExists(id)){
                throw new CustomError(404, "task id does not exist");
            }
            await this.taskModel.removeTaskById(id)
            res.status(204).send("Task deleted successfully.");
        }catch (error){
            next(error)
        }
    }

    private validateTaskData = (task: TaskToInsert) => {
        return task.task_description && task.task_status && task.task_name && task.task_icon_url
    }

    private checkTaskIdExists = async (id: string): Promise<boolean> => {
        const queryResult = await pool.query(`SELECT * FROM tasks WHERE task_id = $1`,[id])
        return queryResult.rowCount === 1;
    }
}