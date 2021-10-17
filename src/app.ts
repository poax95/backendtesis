import express from 'express';
import morgan from 'morgan';

const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));


export default app;