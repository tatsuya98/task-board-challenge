import {BoardController} from "../controllers/boards.controllers.ts";
import express from 'express';
const boardRouter = express.Router()

const boardController: BoardController = new BoardController()

boardRouter.route("/").post(boardController.postBoard);
boardRouter.route("/:id").get(boardController.getBoardById).put(boardController.putBoard).delete(boardController.deleteBoardById);

export default boardRouter;
