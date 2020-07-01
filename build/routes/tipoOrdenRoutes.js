"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoOrdenController_1 = require("../controllers/tipoOrdenController");
class tipoOrdenRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipoOrdenController_1.tipoOController.list);
        this.router.get('/:id', tipoOrdenController_1.tipoOController.getOne);
        this.router.post('/', tipoOrdenController_1.tipoOController.create);
        this.router.put('/:id', tipoOrdenController_1.tipoOController.update);
        this.router.delete('/:id', tipoOrdenController_1.tipoOController.delete);
    }
}
const tipoORoutes = new tipoOrdenRoutes();
exports.default = tipoORoutes.router;
