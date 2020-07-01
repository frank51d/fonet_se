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
class plataformController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM plataforma', function (error, result) {
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
                p.query('SELECT * FROM plataforma WHERE idplataforma = ?', [id])
                    .then(function (result) {
                    return res.json(result[0]);
                });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('INSERT INTO plataforma set ?', [req.body]);
            });
            res.json({ message: 'Usuario creado...' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('UPDATE plataforma set ? WHERE idplataforma = ?', [req.body, id]);
                res.json({ text: 'Usuario Actualizado!' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('DELETE FROM platafoma WHERE idplataforma = ?', [id]);
                res.json({ text: 'El material fue eliminado' });
            });
        });
    }
}
exports.plataforController = new plataformController();
