"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const materialesRoutes_1 = __importDefault(require("./routes/materialesRoutes"));
const materialesUtiRoutes_1 = __importDefault(require("./routes/materialesUtiRoutes"));
const ordenesRoutes_1 = __importDefault(require("./routes/ordenesRoutes"));
const usuariosRouter_1 = __importDefault(require("./routes/usuariosRouter"));
const tipoOrdenRoutes_1 = __importDefault(require("./routes/tipoOrdenRoutes"));
const plataformRoutes_1 = __importDefault(require("./routes/plataformRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const chartRoutes_1 = __importDefault(require("./routes/chartRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const photoRoutes_1 = __importDefault(require("./routes/photoRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/materiales', materialesRoutes_1.default);
        this.app.use('/api/materialesUti', materialesUtiRoutes_1.default);
        this.app.use('/api/ordenes', ordenesRoutes_1.default);
        this.app.use('/api/ordenes/listar', ordenesRoutes_1.default);
        this.app.use('/api/ordenes/listar/fill', ordenesRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRouter_1.default);
        this.app.use('/api/usuarios/authenticate', usuariosRouter_1.default);
        this.app.use('/api/tipoOrden', tipoOrdenRoutes_1.default);
        this.app.use('/api/plataforma', plataformRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
        this.app.use('/api/chart', chartRoutes_1.default);
        this.app.use('/api/reportes', reportRoutes_1.default);
        //imaganes
        this.app.use('/api/photos', photoRoutes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
        //route to backup
        this.app.use('/backup', express_1.default.static(path_1.default.resolve('backup')));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
