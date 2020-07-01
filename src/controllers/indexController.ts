import express from 'express';
import path from 'path'
import { Request, Response } from 'express';
import mysqldump from 'mysqldump';

class IndexController {

    index(req: Request, res: Response) {
        res.json({ text: 'La API esta en /api/ordenes' });
    }

    backup() {
        mysqldump({
            connection: {
                host: 'localhost',
                user: 'fonet',
                password: 'lK7fqM4xU@',
                database: 'fonet_app',
            },
            dumpToFile: './backup/backup_fonet_app.sql',
        });
        express.static(path.resolve('backup'))
    }

}

export const indexController = new IndexController();