import "reflect-metadata";
import * as express from "express";

import {UserRouter} from './routes/UserRoutes';

const app = express();

app.use(express.json());
app.use(UserRouter);


app.listen(3000);
