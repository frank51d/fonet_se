"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chartController_1 = require("../controllers/chartController");
class chartsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/tecnicos', chartController_1.chartController.list);
        this.router.get('/meses', chartController_1.chartController.ordenesMes);
        this.router.get('/count', chartController_1.chartController.howManyTodas);
        this.router.get('/count/:user', chartController_1.chartController.howManyOrder);
    }
}
const chartRoutes = new chartsRoutes();
exports.default = chartRoutes.router;
