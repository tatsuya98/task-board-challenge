
import {errorHandler} from "./errorHandling/errorHandling";
const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./routes/apiRouter');
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);
app.use(errorHandler)
module.exports = app