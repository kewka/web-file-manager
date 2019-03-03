import './utils/common/logger';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';

const app = express();
const port = +process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use(router);

app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
