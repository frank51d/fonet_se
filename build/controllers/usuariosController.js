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
class usuariosController {
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //await pool.then(function(p){
            //   p.query('SELECT * FROM usuarios', function(error: any, result: any[]){
            //     if (error) throw (error);
            //     return res.json(result);
            //  });
            // });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT usuario.id, usuario.nombre, usuario.nombre_usuario FROM usuario', function (error, result) {
                    if (error)
                        throw (error);
                    return res.json(result);
                });
            });
        });
    }
    showTecByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM usuario WHERE id = ?', [id])
                    .then(function (result) {
                    if (result.length > 0) {
                        return res.json(result[0]);
                    }
                });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('INSERT INTO usuario set ?', [req.body]);
            });
            res.json({ message: 'Usuario creado...' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('UPDATE usuario set ? WHERE id = ?', [req.body, id]);
                res.json({ text: 'Usuario Actualizado!' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('DELETE FROM usuario WHERE id = ?', [id]);
                res.json({ text: 'El material fue eliminado' });
            });
        });
    }
}
exports.usuarioController = new usuariosController();
