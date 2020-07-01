"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mysqldump_1 = __importDefault(require("mysqldump"));
class IndexController {
    index(req, res) {
        res.json({ text: 'La API esta en /api/ordenes' });
    }
    backup() {
        mysqldump_1.default({
            connection: {
                host: 'localhost',
                user: 'fonet',
                password: 'lK7fqM4xU@',
                database: 'fonet_app',
            },
            dumpToFile: './backup/backup_fonet_app.sql',
        });
        express_1.default.static(path_1.default.resolve('backup'));
    }
}
exports.indexController = new IndexController();
