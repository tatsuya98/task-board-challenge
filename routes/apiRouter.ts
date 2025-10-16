import endPointsRouter from "./endPointsRouter.ts";
import express from 'express';
const apiRouter = express.Router();
import boardRouter from "./boardRouter.ts";
import taskRouter from "./taskRouter.ts";
apiRouter.use("/boards", boardRouter);
apiRouter.use("/tasks", taskRouter)
apiRouter.use("/",endPointsRouter)
export default apiRouter;