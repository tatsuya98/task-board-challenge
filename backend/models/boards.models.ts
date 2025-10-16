import type {BoardData} from "../../types.ts";
import pool from "../database/connection.ts";
import {CustomError} from "../errorHandling/ErrorHandler.ts";

export class BoardModel {

    public async fetchBoardById(id: string): Promise<BoardData>{
        const foundBoard = await pool.query(`SELECT * FROM boards WHERE board_id = $1`, [id]);
        if(foundBoard.rowCount === 0){
            throw(new CustomError(404, "Board not found"))
        }
        return foundBoard.rows[0];
    }

    public async createBoard(board_name: string, board_description: string): Promise<string> {
        const queryResult =  await pool.query(`INSERT INTO boards (board_name, board_description)
            VALUES ($1, $2) RETURNING board_id`, [board_name, board_description])
        return queryResult.rows[0].board_id;
    }

    public async updateBoardById(id: string, board_name: string): Promise<void> {
       const queryResult = await pool.query(`UPDATE boards SET board_name = $1 WHERE board_id = $2`, [board_name, id]);
       if(queryResult.rowCount === 0){
           throw(new CustomError(404, "Board not found"))
       }
    }

    public async removeBoardById(id: string): Promise<void> {
        await pool.query(`DELETE FROM tasks WHERE board_id = $1`, [id]);
        const queryResult = await pool.query(`DELETE FROM boards WHERE board_id = $1`, [id]);
        if(queryResult.rowCount === 0){
            throw(new CustomError(404, "Board not found"))
        }
    }

}