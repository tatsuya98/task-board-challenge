

const apiRouter = require("express").Router();
const boardRouter = require("./boardRouter");

apiRouter.use("/boards", boardRouter);
module.exports = apiRouter;