import type{ Request, Response} from 'express';
import endPoints from "./endpoints.json" with { type: "json" };
export const getEndpoints = async (_req: Request, res: Response) => {
    res.status(200).json(endPoints);
}