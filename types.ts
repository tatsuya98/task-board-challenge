 type TaskStatus =
    | "Task to do"
    | "Task in progress"
    | "Task won't do"
    | "Task completed";

export type TaskData = {
    task_id: string;
    task_name: string;
    task_description?: string;
    task_status: TaskStatus;
    task_icon_url: string;
    board_id: string;
};

export type Task = {
    task_id: string;
    task_name: string;
    task_description?: string;
    task_status: TaskStatus;
    task_icon_url: string;
}
export type TaskToInsert = {
    task_name: string;
    task_description?: string;
    task_status: TaskStatus;
    task_icon_url: string;
}
export type TaskToUpdate = {
    task_name?: string;
    task_description?: string;
    task_status?: TaskStatus;
}
 type UUID = string;
 export type BoardData = {
     board_id: UUID;
     board_name: string;
     board_description?: string;
 };
