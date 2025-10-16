import tasksData from "../testData/tasksData.ts";
import boardsData from "../testData/boardsData.ts";
import seed from "../database/seed.ts";
import pool from "../database/connection.ts";
import request from 'supertest';
import app from "../app.ts";
import type {Task} from "../types.js";
beforeEach(async () => {
    await seed(boardsData, tasksData)
})
afterAll( async () => {
     await pool.end();
})


describe("Boards", (): void => {
    describe("GET", (): void => {
        it("Should return a board by id", async () => {
            // ACT
            const id:string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8";
            // ARRANGE
            const response = await request(app)
                .get(`/api/boards/${id}`)
                .expect(200);
            const { board, tasks } = response.body;

            expect(board.board_id).toEqual(id);
            expect(board).toEqual({
                board_id: expect.any(String),
                board_name: expect.any(String),
                board_description: expect.any(String),
            });
            tasks.forEach((task: Task) => {
                expect(task).toEqual(({
                    task_id: expect.any(String),
                    task_name: expect.any(String),
                    task_description: expect.any(String),
                    task_status: expect.any(String),
                    task_icon_url: expect.any(String),
                }))
            })
        })

        it("Should return a Board not found for id that does not exist", async () => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a2"
            const response = await request(app)
                .get(`/api/boards/${id}`)
                .expect(404);
            const { error } = response.body;
            expect(error).toHaveProperty("message");
            expect(error.message).toBe("Board not found")
        })

        it("Should return id must be a valid UUID with a status 400", async (): Promise<void> => {
            const id: string = "400"
            const response = await request(app)
                .get(`/api/boards/${id}`)
                .expect(400);
            const { error } = response.body;
            expect(error.message).toBe("id must be a valid UUID")
        })
    })
    describe("POST", (): void => {
        it("Should return the new board id after post request", async () => {
        const testBoard = {
            board_name: "testBoard",
            board_description: "test description",
        }
        const uuidLength:number = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a2".length
        const response = await request(app)
            .post("/api/boards")
            .send(testBoard)
            .expect(201);
        const { board_id } = response.body;
        expect(board_id).toEqual(expect.any(String));
        expect(board_id.length).toBe(uuidLength);
    })
    })
    describe("PUTS", (): void => {
        it("should return a status code of 201 for a successful put request", async () => {
          const id:string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8"
          const body = {
              board_name: "New Name"
          }
          const response = await request(app)
              .put(`/api/boards/${id}`)
              .send(body)
              .expect(201);
          const { message } = response.body;
          expect(message).toEqual("Board name has been updated")
        })
        it("should return a status code 404 with a message board not found for an id that does not exist", async () => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e4f7a3"
            const body = {
                board_name: "New Name"
            }
            const response = await request(app)
                .put(`/api/boards/${id}`)
                .send(body)
                .expect(404);
            const { error } = response.body;
            expect(error.message).toEqual("Board not found")
        })
        it("should return a status code 400 for incorrect type on board_name", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8"
            const body = {
                board_name: 400
            }
            const response = await request(app)
                .put(`/api/boards/${id}`)
                .send(body)
                .expect(400);
            const { error } = response.body;
            expect(error).toHaveProperty("message");
            expect(error.message).toBe("board name must be a string")
        })
        it("should return a status code 400 with message board name string is empty for empty board_name", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8"
            const body = {
                board_name: ""
            }
            const response = await request(app)
                .put(`/api/boards/${id}`)
                .send(body)
                .expect(400);
            const { error } = response.body;
            expect(error).toHaveProperty("message");
            expect(error.message).toBe("board name string is empty")
        })
        it("should return a status code 400 with message id must be a valid UUID", async (): Promise<void> => {
            const id: string = "1a2b3c4d-5e6f-7080-91a2-"
            const body = {
                board_name: "test name"
            }
            const response = await request(app)
                .put(`/api/boards/${id}`)
                .send(body)
                .expect(400);
            const { error } = response.body;
            expect(error).toHaveProperty("message");
            expect(error.message).toBe("id must be a valid UUID")
        })
    })
    describe("DELETE", (): void => {
        it("should return a status code of 204", async () => {
            const id:string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6f7a8";
            await request(app)
                .delete(`/api/boards/${id}`)
                .expect(204);
        })
        it("should return a status code 404 for an id that does not exist", async () => {
            const id:string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e3f7a1";
            await request(app)
                .delete(`/api/boards/${id}`)
                .expect(404);
        })
        it("should return a status code 400 with message id must be a valid UUID", async () => {
            const id:string = "1a2b3c4d-5e6f-7080-91a2-b3c4d5e6";
            const response = await request(app)
                .delete(`/api/boards/${id}`)
                .expect(400);
            const { error } = response.body;
            expect(error).toHaveProperty("message");
            expect(error.message).toBe("id must be a valid UUID")
        })

    })
})