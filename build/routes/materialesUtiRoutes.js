"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materialesUtiController_1 = require("../controllers/materialesUtiController");
class materialesUtiRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', materialesUtiController_1.materialUtiController.list);
        this.router.get('/:id', materialesUtiController_1.materialUtiController.getByOrder);
        this.router.post('/', materialesUtiController_1.materialUtiController.create);
        //this.router.put('/:id', materialController.update);
        //this.router.delete('/:id', materialController.delete);
    }
}
const materialUtiRoutes = new materialesUtiRoutes();
exports.default = materialUtiRoutes.router;
