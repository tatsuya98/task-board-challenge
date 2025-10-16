import pool from "./connection";
import type {BoardData, TaskData} from "../../types";

import format from "pg-format";
const seed = (boardData: BoardData[], taskData: TaskData[]) => {
    return pool.query("DROP TABLE IF EXISTS tasks CASCADE")
        .then((_) => {
            return pool.query("DROP TABLE IF EXISTS boards")
        })
        .then((_) => {
            return pool.query(`CREATE TABLE boards
                               (
                                   board_id          uuid         default gen_random_uuid() PRIMARY KEY,
                                   board_name        varchar(255) default 'My Task Board',
                                   board_description text         default 'My Board Description'
                               )`)
        })
        .then((_) => {
            return pool.query(`CREATE TABLE tasks
                               (
                                   task_id          uuid         default gen_random_uuid() PRIMARY KEY,
                                   task_name        varchar(255) default 'My Task',
                                   task_description text,
                                   task_status      varchar(255) default 'Task in progress',
                                   task_icon_url    varchar(255) NOT NULL,
                                   board_id         uuid REFERENCES boards (board_id)
                               )`)
        })
        .then((_) => {
            const valuesToInsert: (string)[][] = boardData.map((obj:BoardData): (string)[] => [
                obj.board_id,
                obj.board_name,
                obj.board_description! // `null` is fine here
            ]);
            const insertBoardsQuery = format('INSERT INTO boards (board_id, board_name, board_description) ' +
                'VALUES %L', valuesToInsert)
            return pool.query(insertBoardsQuery)
        })
        .then((_) => {
            const valuesToInsert: (string)[][] = taskData.map((obj:TaskData): (string)[] => [
                obj.task_id,
                obj.task_name,
                obj.task_description!,
                obj.task_status,
                obj.task_icon_url,
                obj.board_id
            ])
            const insertTasksQuery = format('INSERT INTO tasks (task_id, task_name, task_description, task_status, task_icon_url, board_id)' +
                'VALUES %L', valuesToInsert)
            return pool.query(insertTasksQuery)
        })
}


export default seed;