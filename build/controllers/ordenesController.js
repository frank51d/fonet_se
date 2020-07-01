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
class ordenesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.direccion_cliente FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id ORDER BY ordenes_servicio.idorden DESC', function (error, result) {
                    if (error)
                        throw (error);
                    return res.json(result);
                });
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT ordenes_servicio.comentarios, ordenes_servicio.motivo_susp, ordenes_servicio.coordenada, ordenes_servicio.diagnostico_final, ordenes_servicio.diagnostico_inicial, ordenes_servicio.direccion_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.fecha_ejecucion, ordenes_servicio.fecha_reporte, ordenes_servicio.hora_fin, ordenes_servicio.hora_inicio, ordenes_servicio.idestatus_orden, ordenes_servicio.idorden, ordenes_servicio.idtipo_orden, ordenes_servicio.id, ordenes_servicio.movil_cliente, ordenes_servicio.nombres_cliente, ordenes_servicio.ppp_pass, ordenes_servicio.ppp_user, ordenes_servicio.telefono_cliente, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden FROM fonet_app.ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden =  estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden WHERE ordenes_servicio.idorden = ?', [id])
                    .then(function (result) {
                    if (result.length > 0) {
                        return res.json(result[0]);
                    }
                });
            });
        });
    }
    listTecnico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre_usuario = ? ORDER BY ordenes_servicio.idorden DESC', [user])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    getTecnico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM ordenes_servicio WHERE idusario = ?', [id])
                    .then(function (result) {
                    if (result.length > 0) {
                        return res.json(result[0]);
                    }
                });
            });
        });
    }
    getEstatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT estatus_orden.descripcion FROM estatus_orden WHERE idestatus_orden = ?', [req]);
                res.json({ text: 'Orden creada' });
            });
        });
    }
    filtrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log([req.body]);
            yield database_1.default.then(function (p) {
                p.query("SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.direccion_cliente FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE estatus_orden.descripcion LIKE ? AND tipo_orden.descripcion LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND usuario.nombre LIKE ? ORDER BY ordenes_servicio.idorden DESC", [req.body.estatus + "%", "%" + req.body.tipo + "%", "%" + req.body.cliente + "%", "%" + req.body.usuario + "%"])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    filtradoByTec(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log([req.body]);
            yield database_1.default.then(function (p) {
                p.query("SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.direccion_cliente FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE estatus_orden.descripcion LIKE ? AND tipo_orden.descripcion LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND usuario.nombre LIKE ? ORDER BY ordenes_servicio.idorden DESC", ["%" + req.body.estatus + "%", "%" + req.body.tipo + "%", "%" + req.body.cliente + "%", "%" + req.body.usuario + "%"])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    // public async filtradoByTec(req: Request, res: Response): Promise<void> { 
    //     const { user } = req.params;
    //     console.log([req.body]) 
    //     await pool.then(function (p) {
    //         p.query("SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre = ? AND estatus_orden.descripcion LIKE ? AND tipo_orden.descripcion LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND usuario.nombre LIKE ? ORDER BY ordenes_servicio.idorden DESC", [user, "%"+req.body.estatus+"%", "%"+req.body.tipo+"%", "%"+req.body.cliente+"%", "%"+req.body.usuario+"%"])
    //             .then(function (result) {
    //                 return res.json(result);
    //             });
    //     });
    // }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('INSERT INTO ordenes_servicio set ?', [req.body]);
                res.json({ text: 'Orden creada' });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.body);
            yield database_1.default.then(function (p) {
                p.query('UPDATE ordenes_servicio set ? WHERE idorden = ?', [req.body, id]);
                res.json({ text: 'Orden Actualizado!' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('DELETE FROM ordenes_servicio WHERE idorden = ?', [id]);
                res.json({ text: 'La orden fue eliminada' });
            });
        });
    }
}
exports.ordenController = new ordenesController();
