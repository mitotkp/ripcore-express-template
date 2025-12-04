import express from 'express';
import { setupSwagger } from './config/swagger';
import { ripcoreContext } from './middleware/context';
import itemsRouter from './routes/items';

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());

app.use(ripcoreContext);

app.get('/health', (req, res) => {
    res.send({ status: 'ok', timestamp: new Date() });
});

app.use('/items', itemsRouter);

setupSwagger(app);

app.listen(port, () => {
    console.log(`Módulo externo escuchando en el puerto ${port}`);
});