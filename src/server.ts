import "reflect-metadata";
import * as path from 'path'
import * as express from "express";

import {UserRouter} from './routes/UserRoutes';
import { CategoryRouter } from "./routes/CategoryRoutes";
import { ProductRouter } from "./routes/ProductRoutes";

const app = express();

app.use(express.json());
app.use('/static',express.static(path.resolve(__dirname,'..','public','uploads','products')));
app.use(UserRouter);
app.use(CategoryRouter);
app.use(ProductRouter);

app.listen(3000);
