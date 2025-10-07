 type TaskStatus =
    | "Task to do"
    | "Task in progress"
    | "Task won't do"
    | "Task completed";

export type TaskData = {
    task_id: string;
    task_name: string;
    task_description: string | null;
    task_status: TaskStatus;
    task_icon_url: string;
    board_id: string;
};
 type UUID = string;
 export type BoardData = {
     board_id: UUID;
     board_name: string;
     board_description: string | null;
 };