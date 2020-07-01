"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materialesController_1 = require("../controllers/materialesController");
class materialesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', materialesController_1.materialController.list);
        this.router.get('/:id', materialesController_1.materialController.getOne);
        this.router.post('/', materialesController_1.materialController.create);
        this.router.put('/:id', materialesController_1.materialController.update);
        this.router.delete('/:id', materialesController_1.materialController.delete);
    }
}
const materialRoutes = new materialesRoutes();
exports.default = materialRoutes.router;
