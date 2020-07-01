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
class materialesUtiController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM materiales_utilizados', function (error, result) {
                    if (error)
                        throw (error);
                    return res.json(result);
                });
            });
        });
    }
    getByOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT materiales_utilizados.idorden, materiales_utilizados.idmaterial, materiales.descripcion, materiales_utilizados.cantidad  FROM materiales INNER JOIN materiales_utilizados ON materiales.idmaterial = materiales_utilizados.idmaterial INNER JOIN ordenes_servicio ON ordenes_servicio.idorden = materiales_utilizados.idorden WHERE ordenes_servicio.idorden = ?', [id])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('INSERT INTO materiales_utilizados set ?', [req.body]);
            });
            res.json({ message: 'Material creado...' });
        });
    }
}
exports.materialUtiController = new materialesUtiController();
