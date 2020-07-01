"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plataformController_1 = require("../controllers/plataformController");
class plataformRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', plataformController_1.plataforController.list);
        this.router.get('/:id', plataformController_1.plataforController.getOne);
        this.router.post('/', plataformController_1.plataforController.create);
        this.router.put('/:id', plataformController_1.plataforController.update);
        this.router.delete('/:id', plataformController_1.plataforController.delete);
    }
}
const plataforRoutes = new plataformRoutes();
exports.default = plataforRoutes.router;
