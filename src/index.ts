import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import indexRoutes from './routes/indexRoutes';
import materialRoutes from './routes/materialesRoutes';
import materialesUtiRoutes from './routes/materialesUtiRoutes';
import ordenesRoutes from './routes/ordenesRoutes';
import usuariosRouter from './routes/usuariosRouter';
import tipoOrdenRouter from './routes/tipoOrdenRoutes';
import plataformRoutes from './routes/plataformRoutes'
import authRoutes from './routes/authRoutes';
import chartRoutes from './routes/chartRoutes';
import reportRoutes from './routes/reportRoutes';
import photoRoutes from './routes/photoRoutes';


class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:false }));

    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/materiales', materialRoutes);
        this.app.use('/api/materialesUti', materialesUtiRoutes);
        this.app.use('/api/ordenes', ordenesRoutes);
        this.app.use('/api/ordenes/listar', ordenesRoutes);
        this.app.use('/api/ordenes/listar/fill', ordenesRoutes);
        this.app.use('/api/usuarios', usuariosRouter);
        this.app.use('/api/usuarios/authenticate', usuariosRouter);
        this.app.use('/api/tipoOrden', tipoOrdenRouter);
        this.app.use('/api/plataforma', plataformRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/chart', chartRoutes);
        this.app.use('/api/reportes', reportRoutes);

        //imaganes
        this.app.use('/api/photos', photoRoutes);
        this.app.use('/uploads', express.static(path.resolve('uploads')));

        //route to backup
        this.app.use('/backup', express.static(path.resolve('backup')))

    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();