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
class authenController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM materiales', function (error, result) {
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
                p.query('SELECT * FROM materiales WHERE idmaterial = ?', [id])
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
                p.query('INSERT INTO materiales set ?', [req.body]);
            });
            res.json({ message: 'Material creado...' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('UPDATE materiales set ? WHERE idmaterial = ?', [req.body, id]);
                res.json({ text: 'Material Actualizado!' });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then(function (p) {
                p.query('DELETE FROM materiales WHERE idmaterial = ?', [id]);
                res.json({ text: 'El material fue eliminado' });
            });
        });
    }
}
exports.authController = new authenController();
