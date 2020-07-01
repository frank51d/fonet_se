import {Request, Response} from 'express';

import pool from '../database'

class chartsController{

    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT usuario.id, usuario.nombre AS tecnico, count(*) AS ordenes FROM fonet_app.ordenes_servicio INNER JOIN usuario ON ordenes_servicio.id = usuario.id group by usuario.id', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async howManyOrder(req: Request, res: Response): Promise<void>{

        const { user } = req.params;

        await pool.then(function (p) {
            p.query('SELECT estatus_orden.idestatus_orden, COUNT(*) as cantidad FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre_usuario = ? GROUP BY ordenes_servicio.idestatus_orden ORDER BY idestatus_orden', [user])
            .then(function (result) {
                
                    return res.json(result);
                
            });
        });
    }

    public async howManyTodas(req: Request, res: Response): Promise<void>{

        await pool.then(function (p) {
            p.query('SELECT estatus_orden.idestatus_orden, COUNT(*) as cantidad FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id GROUP BY ordenes_servicio.idestatus_orden ORDER BY idestatus_orden')
            .then(function (result) {
                
                    return res.json(result);
                
            });
        });
    }

    public async ordenesMes(req: Request, res: Response): Promise<void>{

        await pool.then(function (p) {
            p.query('SET lc_time_names = es_MX')
        });

        await pool.then(function (p) {
            p.query('SELECT MonthName(ordenes_servicio.fecha_reporte) AS mes , count(*) AS cantidad FROM ordenes_servicio GROUP BY mes')
            .then(function (result) {
                
                    return res.json(result);
                
            });
        });
    }

    public async howManyOrderByType(req: Request, res: Response): Promise<void>{

        const { user } = req.params;

        await pool.then(function (p) {
            p.query('SELECT tipo_orden.idtipo_orden, tipo_orden.descripcion AS tipo, COUNT(*) AS cantidad FROM ordenes_servicio INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre_usuario = ? AND ordenes_servicio.idestatus_orden = 3 GROUP BY tipo_orden.descripcion', [user])
            .then(function (result) { 
                return res.json(result);  
            });
        });
    }

    public async ordenesMesByTec(req: Request, res: Response): Promise<void>{

        const { user } = req.params;

        await pool.then(function (p) {
            p.query('SET lc_time_names = es_MX')
        });

        await pool.then(function (p) {
            p.query('SELECT MonthName(ordenes_servicio.fecha_reporte) AS mes , count(*) AS cantidad FROM ordenes_servicio INNER JOIN usuario ON ordenes_servicio.id = usuario.id INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden WHERE usuario.nombre_usuario = ? AND estatus_orden.idestatus_orden = 3 GROUP BY mes', [user])
            .then(function (result) {
                return res.json(result);
            });
        });
    }

}

export const chartController = new chartsController();