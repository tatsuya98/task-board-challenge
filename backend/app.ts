

import {errorHandler} from "./errorHandling/errorHandling.ts";
import express from 'express';
const app = express()
import cors from "cors"
import apiRouter from "./routes/apiRouter.ts";
app.use(express.json());

app.use(cors());
app.use("/api", apiRouter);
app.use(errorHandler)
export default app;