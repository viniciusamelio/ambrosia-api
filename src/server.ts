import "reflect-metadata";
import * as express from "express";

import {UserRouter} from './routes/UserRoutes';
import { CategoryRouter } from "./routes/CategoryRoutes";

const app = express();

app.use(express.json());
app.use(UserRouter);
app.use(CategoryRouter);

app.listen(3000);
