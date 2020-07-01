"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class usuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuariosController_1.usuarioController.list);
        this.router.get('/:id', usuariosController_1.usuarioController.showTecByID);
        this.router.post('/', usuariosController_1.usuarioController.create);
        this.router.post('/authenticate/', usuariosController_1.usuarioController.authenticate);
        this.router.put('/:id', usuariosController_1.usuarioController.update);
        this.router.delete('/:id', usuariosController_1.usuarioController.delete);
    }
}
const usuarioRoutes = new usuariosRoutes();
exports.default = usuarioRoutes.router;
