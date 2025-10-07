import {BoardController} from "../controllers/boards.controllers";

const express = require('express')
const boardRouter = express.Router()

const boardController: BoardController = new BoardController()

boardRouter.route("/").post(boardController.postBoard);
boardRouter.route("/:id").get(boardController.getBoardById).put(boardController.putBoard).delete(boardController.deleteBoardById);

module.exports = boardRouter;
