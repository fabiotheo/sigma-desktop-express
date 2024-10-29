import express from 'express';
import dotenv from 'dotenv';
import routes from "./routes/index.js";
import cors from 'cors';

dotenv.config();

const app = express();
const port = 8001;

app.use(express.json());

app.enable('trust proxy');

app.use(
    cors({
        origin: '*',
    })
);

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
