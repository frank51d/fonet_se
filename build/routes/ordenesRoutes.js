"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordenesController_1 = require("../controllers/ordenesController");
class ordenesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ordenesController_1.ordenController.list);
        this.router.get('/:id', ordenesController_1.ordenController.getOne);
        this.router.get('/listar/:user', ordenesController_1.ordenController.listTecnico);
        this.router.post('/listar/fill/', ordenesController_1.ordenController.filtrado);
        this.router.post('/', ordenesController_1.ordenController.create);
        this.router.put('/:id', ordenesController_1.ordenController.update);
        this.router.delete('/:id', ordenesController_1.ordenController.delete);
    }
}
const ordenRoutes = new ordenesRoutes();
exports.default = ordenRoutes.router;
