import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import reportsRouter from "./reports";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(reportsRouter);

export default router;
