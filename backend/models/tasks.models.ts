import pool from "../database/connection.ts";
import type {Task, TaskToInsert, TaskToUpdate} from "../../types.ts";
import {checkBoardIdExists} from "../utils.ts";
import {CustomError} from "../errorHandling/errorHandling.ts";
import format from "pg-format";

export class TaskModel {

    public async fetchTasksByBoardId(boardId: string): Promise<Task[]> {
        const query = await pool.query(`SELECT task_id, task_name, task_description, task_status, task_icon_url
                                        FROM tasks
                                        WHERE board_id = $1`, [boardId])
        if (query.rowCount === 0) {
            throw (new CustomError(404, "board id does not exist"))
        }
        return query.rows as Task[];
    }

    public async createTask(task: TaskToInsert, id: string): Promise<void> {
        if (!await checkBoardIdExists(id)) {
            throw (new CustomError(404, "board id does not exist"))
        }
        const valuesToInsert = [[task.task_name, task.task_description, task.task_status, task.task_icon_url, id]];
        const query = format('INSERT INTO tasks (task_name, task_description, task_status, task_icon_url, board_id ) VALUES %L', valuesToInsert)
        await pool.query(query);
    }

    public async updateTask(taskUpdateInfo: TaskToUpdate, id: string): Promise<void> {
        const nameWithValuesToUpdate = Object.entries(taskUpdateInfo)
            .filter(([key, value]) =>
                    value !== undefined && value !== null
            );
        const setClause = nameWithValuesToUpdate.map(([column, value]) => format('%I = %L', column, value));
        const query = `update tasks set ${setClause} WHERE task_id = $1`;
        await pool.query(query, [id]);
    }

    public async removeTaskById(id: string): Promise<void> {
        await pool.query("DELETE FROM tasks WHERE tasks.task_id = $1", [id]);
    }
}

