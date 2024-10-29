import {Router} from "express";
import clickToCallRoutes from "./sigma/clickToCall.js";
import audioIdRouter from "./record/audioId.js";

const routes = Router();

routes.use('/api/clicktocall', clickToCallRoutes);
routes.use('/api/audiofile', audioIdRouter)

export default routes;
