import express from 'express';
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Подключение CORS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const allowedOrigins = ['https://react-test-task-beta.vercel.app'];
const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); 

app.use('/api', middlewares, router);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
