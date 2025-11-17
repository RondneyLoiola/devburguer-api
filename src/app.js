import cors from 'cors';
import express from 'express';
import fileRouteConfig from './config/fileRoutes.cjs';
import routes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //por causa do type module
app.use('/product-file', fileRouteConfig); //rota para ver a foto do produto
app.use('/category-file', fileRouteConfig);

app.use(routes);

export default app;
