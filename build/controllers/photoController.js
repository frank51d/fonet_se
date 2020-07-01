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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const database_1 = __importDefault(require("../database"));
class photosController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idorden } = req.body;
            console.log('saving photo');
            console.log(req.file);
            const newPhoto = {
                idorden: idorden,
                codigo_foto: req.file.filename,
                imagePath: req.file.path
            };
            const photo = newPhoto;
            console.log(photo);
            yield database_1.default.then(function (p) {
                p.query('INSERT INTO code_foto set ?', [photo]);
            });
            return res.json({ message: 'Imagen guardada' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM code_foto', function (error, result) {
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
                p.query('SELECT * FROM code_foto WHERE idorden = ?', [id])
                    .then(function (result) {
                    return res.json(result);
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let photo;
            yield database_1.default.then(function (p) {
                p.query('SELECT * FROM code_foto WHERE idcode_foto = ?', [id])
                    .then(function (result) {
                    if (result.length > 0) {
                        photo = result[0];
                        database_1.default.then(function (p) {
                            p.query('DELETE FROM code_foto WHERE idcode_foto = ?', [photo.idcode_foto]);
                            fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
                        });
                        return res.json(result[0]);
                    }
                });
            });
        });
    }
}
exports.photoController = new photosController();
