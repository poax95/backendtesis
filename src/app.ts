import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware  from './middlewares/passport';

import authRoutes from './routes/auth.routes'


//inicializaciones
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//rutas
app.use('/api', indexRoutes);

app.use(authRoutes);

//carpeta para almacenamiento de archivos
app.use('/uploads', express.static(path.resolve('uploads')));



export default app;