"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photoController_1 = require("../controllers/photoController");
const multer_1 = __importDefault(require("../libs/multer"));
class photosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', photoController_1.photoController.list);
        this.router.get('/:id', photoController_1.photoController.getByOrder);
        this.router.post('/', multer_1.default.single('image'), photoController_1.photoController.create);
        this.router.delete('/:id', photoController_1.photoController.delete);
    }
}
const photoRoutes = new photosRoutes();
exports.default = photoRoutes.router;
