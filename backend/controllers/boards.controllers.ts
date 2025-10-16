import {BoardModel} from "../models/boards.models.ts";

import type {NextFunction, Request, Response} from 'express';
import {validateId} from "../utils.ts";
import {CustomError} from "../errorHandling/ErrorHandler.ts";
import type {Task} from "../types.js";
import {TaskModel} from "../models/tasks.models.ts";

export class BoardController {
    private boardModel: BoardModel;
    private taskModel: TaskModel;
    constructor() {
        this.boardModel = new BoardModel();
        this.taskModel = new TaskModel();
    }

    public getBoardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {id} = req.params;
            if (!validateId(id)) {
                throw (new CustomError(400, "id must be a valid UUID"));
            }
            const foundBoard = await this.boardModel.fetchBoardById(id);
            const tasks: Task[] = await this.taskModel.fetchTasksByBoardId(id);
            res.status(200).json({ "board" : foundBoard, "tasks": tasks });
        } catch (err) {
            next(err)
        }
    }

    public postBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {board_name, board_description} = req.body;
            const newBoardId: string = await this.boardModel.createBoard(board_name, board_description);
            res.status(201).json({board_id: newBoardId});
        }catch (err) {
            next(err)
        }
    }

    public putBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {id} = req.params;
            if (!validateId(id)) {
                throw (new CustomError(400, "id must be a valid UUID"));
            }
            const {board_name} = req.body;
            if (typeof board_name !== "string") {
                throw (new CustomError(400, "board name must be a string"));
            }
            if (board_name.length === 0) {
                throw (new CustomError(400, "board name string is empty"));
            }
            await this.boardModel.updateBoardById(id, board_name);
            res.status(201).send({message: "Board name has been updated"});
        } catch (err) {
            next(err)
        }
    }

    public deleteBoardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {id} = req.params;
            if (!validateId(id)) {
                throw (new CustomError(400, "id must be a valid UUID"));
            }
            await this.boardModel.removeBoardById(id);
            res.status(204).send({message: "Board has been deleted"});
        } catch (err) {
            next(err)
        }
    }
}