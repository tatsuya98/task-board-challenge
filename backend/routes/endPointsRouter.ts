import express from 'express';
import {getEndpoints} from "../Endpoints/getEndpoints.ts";
const endPointsRouter = express.Router()
endPointsRouter.route("/").get(getEndpoints)

export default endPointsRouter;