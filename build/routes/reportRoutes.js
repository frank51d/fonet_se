"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
class reportsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/full', reportController_1.reportController.list);
        this.router.post('/fecha', reportController_1.reportController.intervalo);
        this.router.post('/detallado/1', reportController_1.reportController.countTipoByTec);
        this.router.post('/detallado/2', reportController_1.reportController.countStatusByTec);
        this.router.post('/detallado/3', reportController_1.reportController.countAllByTipo);
        this.router.post('/detallado/4', reportController_1.reportController.countAllByStatus);
        this.router.post('/detallado/5', reportController_1.reportController.countAllSameDay);
        this.router.post('/detallado/6', reportController_1.reportController.countAll1Day);
        this.router.post('/detallado/7', reportController_1.reportController.countAllMore2Day);
        this.router.get('/detallado/8', reportController_1.reportController.avg);
    }
}
const reportRoutes = new reportsRoutes();
exports.default = reportRoutes.router;
