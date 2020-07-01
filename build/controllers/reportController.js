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
class reportsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo, usuario.nombre AS tecnico, ordenes_servicio.nombres_cliente, ordenes_servicio.direccion_cliente, ordenes_servicio.fecha_reporte, ordenes_servicio.fecha_asig, ordenes_servicio.fecha_ejecucion, ordenes_servicio.diagnostico_final FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE tipo_orden.descripcion LIKE ? AND usuario.nombre LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND ordenes_servicio.fecha_ejecucion LIKE ? AND ordenes_servicio.fecha_asig LIKE ? ORDER BY ordenes_servicio.idorden DESC', ["%" + req.body.tipo + "%", "%" + req.body.usuario + "%", "%" + req.body.cliente + "%", "%" + req.body.fecha_ejecucion + "%", "%" + req.body.fecha_asig + "%"])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    intervalo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo, usuario.nombre AS tecnico, ordenes_servicio.nombres_cliente, ordenes_servicio.direccion_cliente, ordenes_servicio.fecha_reporte, ordenes_servicio.fecha_asig, ordenes_servicio.fecha_ejecucion, ordenes_servicio.diagnostico_final FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE ordenes_servicio.fecha_ejecucion BETWEEN ? AND ? ORDER BY ordenes_servicio.fecha_ejecucion ASC', [req.body.fecha_inicio, req.body.fecha_fin])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    countAllByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT estatus_orden.descripcion AS tipo_orden, COUNT(*) AS cantidad FROM estatus_orden INNER JOIN ordenes_servicio ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) GROUP BY estatus_orden.descripcion ORDER BY estatus_orden.idestatus_orden', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    countAllByTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT tipo_orden.descripcion, COUNT(*) AS cantidad FROM tipo_orden INNER JOIN ordenes_servicio ON tipo_orden.idtipo_orden=ordenes_servicio.idtipo_orden  WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) GROUP BY tipo_orden.descripcion', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    countTipoByTec(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.nombre, tipo_orden.descripcion AS tipo_orden, COUNT(*) AS cantidad FROM tipo_orden INNER JOIN ordenes_servicio ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON usuario.id = ordenes_servicio.id  WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) GROUP BY tipo_orden.descripcion, usuario.nombre ORDER BY tipo_orden.descripcion, usuario.nombre', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    countStatusByTec(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.nombre, estatus_orden.descripcion AS estatus_orden, COUNT(*) AS cantidad FROM estatus_orden INNER JOIN ordenes_servicio ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN usuario ON usuario.id = ordenes_servicio.id  WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) GROUP BY estatus_orden.descripcion, usuario.nombre ORDER BY estatus_orden.descripcion, usuario.nombre', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    //ordenes de servicio ejecutadas el mismo dia de la asignacion, agrupadas por tecnico
    countAllSameDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.id, usuario.nombre, COUNT(*) AS cantidad FROM ordenes_servicio INNER JOIN usuario ON usuario.id = ordenes_servicio.id WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) AND (DATEDIFF(ordenes_servicio.fecha_ejecucion, ordenes_servicio.fecha_asig) = 0) GROUP BY usuario.nombre ORDER BY usuario.id', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    //ordenes de servicio ejecutadas el segundo desde la asigancion, agrupadas por tecnico
    countAll1Day(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.id, usuario.nombre, COUNT(*) AS cantidad FROM ordenes_servicio INNER JOIN usuario ON usuario.id = ordenes_servicio.id WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) AND (DATEDIFF(ordenes_servicio.fecha_ejecucion, ordenes_servicio.fecha_asig) = 1) GROUP BY usuario.nombre ORDER BY usuario.id', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    //ordenes de servicio ejecutadas el tercer dia o mas desde la asignacion, agrupadas por tecnico
    countAllMore2Day(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.id, usuario.nombre, COUNT(*) AS cantidad FROM ordenes_servicio INNER JOIN usuario ON usuario.id = ordenes_servicio.id WHERE ordenes_servicio.fecha_reporte BETWEEN COALESCE(?,"2000-01-01") AND COALESCE(?,NOW()) AND (DATEDIFF(ordenes_servicio.fecha_ejecucion, ordenes_servicio.fecha_asig) >= 2) GROUP BY usuario.nombre ORDER BY usuario.id', [req.body.start_date, req.body.end_date])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    //promedio de atención
    avg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT AVG(DATEDIFF(ordenes_servicio.fecha_ejecucion,ordenes_servicio.fecha_asig)) AS promedio FROM ordenes_servicio ORDER BY ordenes_servicio.idorden')
                    .then(function (result) {
                    if (result.length > 0) {
                        return res.json(result[0]);
                    }
                });
            });
        });
    }
}
exports.reportController = new reportsController();
