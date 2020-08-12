import "reflect-metadata";
import * as path from 'path'
import * as express from "express";

require('dotenv').config();

import { UserRouter } from './routes/UserRoutes';
import { CategoryRouter } from "./routes/CategoryRoutes";
import { ProductRouter } from "./routes/ProductRoutes";
import { PaymentMethodRouter } from "./routes/PaymentMethodRoutes";
import { OrderRouter } from "./routes/OrderRoutes";
import { PaymentRouter } from "./routes/PaymentRoutes";

const app = express();

app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, '..', 'public', 'uploads', 'products')));
app.use(UserRouter);
app.use(CategoryRouter);
app.use(ProductRouter);
app.use(PaymentMethodRouter);
app.use(OrderRouter);
app.use(PaymentRouter);

app.listen(3000);
