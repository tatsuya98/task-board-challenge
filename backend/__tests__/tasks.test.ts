import tasksData from "../testData/tasksData";
import boardsData from "../testData/boardsData";
import seed from "../database/seed";
import pool from "../database/connection";
import type {TaskToInsert, TaskToUpdate} from "../types";

const request = require('supertest');
import app from "../app";
beforeEach(async () => {
    await seed(boardsData, tasksData)
})
afterAll(() => {
    pool.end();
})

describe("Tasks", (): void => {
    describe("GET", (): void => {
        it("should return an array of tasks by board_id", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8";
            const response = await request(app)
                .get(`/api/tasks/${id}`)
                .expect(200)
            const {tasks} = response.body;
            expect(tasks.length).toBeGreaterThanOrEqual(0);
        })

        it("should return a message board id does not exist with status 404", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7010-91a2-b3c4d5e6f7a1";
            const response = await request(app)
                .get(`/api/tasks/${id}`)
                .expect(404)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("board id does not exist");
        })

        it("should return a message id must be a valid UUID", async (): Promise<void> => {
            const id: string = "hello"
            const response = await request(app)
                .get(`/api/tasks/${id}`)
                .expect(400)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("id must be a valid UUID");
        })
    })
    describe("POST", (): void => {
        it("should return status 201", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8";
            const body: TaskToInsert = {
                task_name: "new task",
                task_status: "Task to do",
                task_description: "test",
                task_icon_url: "test.png",
            }
            await request(app)
                .post(`/api/tasks/${id}`)
                .send(body)
                .expect(201)
        })
        it("should return status 404 for a board id that does not exist", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f2a1";
            const body: TaskToInsert = {
                task_name: "new task",
                task_status: "Task to do",
                task_description: "test",
                task_icon_url: "test.png",
            }
            const response = await request(app)
                .post(`/api/tasks/${id}`)
                .send(body)
                .expect(404)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("board id does not exist");
        })

       it("should return a message id must be a valid UUID", async (): Promise<void> => {
           const id: string = "hi"
           const body: TaskToInsert = {
               task_name: "new task",
               task_status: "Task to do",
               task_description: "test",
               task_icon_url: "test.png",
           }
           const response = await request(app)
               .post(`/api/tasks/${id}`)
               .send(body)
               .expect(400)
           const {error} = response.body;
           expect(error).toHaveProperty("message")
           expect(error.message).toBe("id must be a valid UUID");
       })
    })
    describe("PUT", (): void => {
        it("should return status 201", async (): Promise<void> => {
            const id: string = "e8d9c0b1-a2f3-4567-890a-bcdef0123456";
            const body:TaskToUpdate = {
                task_name: "new task yes",
                task_description: "yesss"
            }
            await request(app)
                .put(`/api/tasks/${id}`)
                .send(body)
                .expect(201)
        })
        it("should return a message task id does not exist with status 404", async (): Promise<void> => {
            const id: string = "e8d9c0b1-a2f3-4567-890a-bcdef0123321";
            const body:TaskToUpdate = {
                task_name: "new task yes",
                task_description: "yesss"
            }
           const response =  await request(app)
                .put(`/api/tasks/${id}`)
                .send(body)
                .expect(404)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("task id does not exist");
        })
        it("should return a message id must be a valid UUID with status 400", async (): Promise<void> => {
            const id: string = "hello";
            const body:TaskToUpdate = {
                task_name: "new task yes",
                task_description: "yesss"
            }
            const response =  await request(app)
                .put(`/api/tasks/${id}`)
                .send(body)
                .expect(400)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("id must be a valid UUID");
        })
    })

    describe("DELETE", (): void => {
        it("should return status 204", async (): Promise<void> => {
            const id: string = "e8d9c0b1-a2f3-4567-890a-bcdef0123456";
            await request(app)
                .delete(`/api/tasks/${id}`)
                .expect(204)
        })

        it("should return a message task id does not exist ", async (): Promise<void> => {
            const id: string = "e8d9c0b1-a2f3-4567-890a-bcdef0123451";
            const response = await request(app)
                .delete(`/api/tasks/${id}`)
                .expect(404)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("task id does not exist");
        })
        it("should return id must be a valid UUID with status 400", async (): Promise<void> => {
            const id: string = "hello";
            const response = await request(app)
                .delete(`/api/tasks/${id}`)
                .expect(400)
            const {error} = response.body;
            expect(error).toHaveProperty("message")
            expect(error.message).toBe("id must be a valid UUID");
        })
    })
})