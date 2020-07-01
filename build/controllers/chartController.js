"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class chartsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.id, usuario.nombre AS tecnico, count(*) AS ordenes FROM fonet_app.ordenes_servicio INNER JOIN usuario ON ordenes_servicio.id = usuario.id group by usuario.id', function (error, result) {
                    if (error)
                        throw (error);
                    return res.json(result);
                });
            });
        });
    }
    howManyOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT estatus_orden.idestatus_orden, COUNT(*) as cantidad FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre_usuario = ? GROUP BY ordenes_servicio.idestatus_orden ORDER BY idestatus_orden', [user])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    howManyTodas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT estatus_orden.idestatus_orden, COUNT(*) as cantidad FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id GROUP BY ordenes_servicio.idestatus_orden ORDER BY idestatus_orden')
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    ordenesMes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SET lc_time_names = es_MX');
            });
            yield database_1.default.then(function (p) {
                p.query('SELECT MonthName(ordenes_servicio.fecha_reporte) AS mes , count(*) AS cantidad FROM ordenes_servicio GROUP BY mes')
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    howManyOrderByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT tipo_orden.idtipo_orden, tipo_orden.descripcion AS tipo, COUNT(*) AS cantidad FROM ordenes_servicio INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre_usuario = ? AND ordenes_servicio.idestatus_orden = 3 GROUP BY tipo_orden.descripcion', [user])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    ordenesMesByTec(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SET lc_time_names = es_MX');
            });
            yield database_1.default.then(function (p) {
                p.query('SELECT MonthName(ordenes_servicio.fecha_reporte) AS mes , count(*) AS cantidad FROM ordenes_servicio INNER JOIN usuario ON ordenes_servicio.id = usuario.id INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden WHERE usuario.nombre_usuario = ? AND estatus_orden.idestatus_orden = 3 GROUP BY mes', [user])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
}
exports.chartController = new chartsController();
