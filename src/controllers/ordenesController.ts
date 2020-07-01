import { Request, Response, json } from 'express';

import pool from '../database'

class ordenesController {

    public async list(req: Request, res: Response): Promise<void> {

        await pool.then(function (p) {
            p.query('SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.direccion_cliente FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id ORDER BY ordenes_servicio.idorden DESC', function (error: any, result: any[]) {
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const { id } = req.params;

        await pool.then(function (p) {
            p.query('SELECT ordenes_servicio.comentarios, ordenes_servicio.motivo_susp, ordenes_servicio.coordenada, ordenes_servicio.diagnostico_final, ordenes_servicio.diagnostico_inicial, ordenes_servicio.direccion_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.fecha_ejecucion, ordenes_servicio.fecha_reporte, ordenes_servicio.hora_fin, ordenes_servicio.hora_inicio, ordenes_servicio.idestatus_orden, ordenes_servicio.idorden, ordenes_servicio.idtipo_orden, ordenes_servicio.id, ordenes_servicio.movil_cliente, ordenes_servicio.nombres_cliente, ordenes_servicio.ppp_pass, ordenes_servicio.ppp_user, ordenes_servicio.telefono_cliente, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden FROM fonet_app.ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden =  estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden WHERE ordenes_servicio.idorden = ?', [id])
                .then(function (result) {
                    if (result.length > 0) {
                        return res.json(result[0]);
                    }
                });
        });

    }

    public async listTecnico(req: Request, res: Response) {

        const { user } = req.params;

        await pool.then(function (p) {
            p.query('SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre_usuario = ? ORDER BY ordenes_servicio.idorden DESC', [user])
                .then(function (result) {

                    return res.json(result);

                });
        });

    }

    public async getTecnico(req: Request, res: Response) {

        const { id } = req.params;

        await pool.then(function (p) {
            p.query('SELECT * FROM ordenes_servicio WHERE idusario = ?', [id])
                .then(function (result) {
                    if (result.length > 0) {
                        return res.json(result[0]);
                    }
                });
        });

    }

    public async getEstatus(req: Request, res: Response) {
        await pool.then(function (p) {
            p.query('SELECT estatus_orden.descripcion FROM estatus_orden WHERE idestatus_orden = ?', [req]);
            res.json({ text: 'Orden creada' });
        });
    }

    public async filtrado(req: Request, res: Response): Promise<void> { 
        console.log([req.body]) 
        await pool.then(function (p) {
            p.query("SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.direccion_cliente FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE estatus_orden.descripcion LIKE ? AND tipo_orden.descripcion LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND usuario.nombre LIKE ? ORDER BY ordenes_servicio.idorden DESC", [req.body.estatus+"%", "%"+req.body.tipo+"%", "%"+req.body.cliente+"%", "%"+req.body.usuario+"%"])
                .then(function (result) {
                    return res.json(result);
                });
        });
    }

    public async filtradoByTec(req: Request, res: Response): Promise<void> { 
        console.log([req.body]) 
        await pool.then(function (p) {
            p.query("SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig, ordenes_servicio.direccion_cliente FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE estatus_orden.descripcion LIKE ? AND tipo_orden.descripcion LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND usuario.nombre LIKE ? ORDER BY ordenes_servicio.idorden DESC", ["%"+req.body.estatus+"%", "%"+req.body.tipo+"%", "%"+req.body.cliente+"%", "%"+req.body.usuario+"%"])
                .then(function (result) {
                    return res.json(result);
                });
        });
    }

    // public async filtradoByTec(req: Request, res: Response): Promise<void> { 
    //     const { user } = req.params;
    //     console.log([req.body]) 
    //     await pool.then(function (p) {
    //         p.query("SELECT ordenes_servicio.idorden, estatus_orden.descripcion AS estatus, tipo_orden.descripcion AS tipo_orden, usuario.nombre, ordenes_servicio.nombres_cliente, ordenes_servicio.fecha_asig FROM ordenes_servicio INNER JOIN estatus_orden ON ordenes_servicio.idestatus_orden = estatus_orden.idestatus_orden INNER JOIN tipo_orden ON ordenes_servicio.idtipo_orden = tipo_orden.idtipo_orden INNER JOIN usuario ON ordenes_servicio.id = usuario.id WHERE usuario.nombre = ? AND estatus_orden.descripcion LIKE ? AND tipo_orden.descripcion LIKE ? AND ordenes_servicio.nombres_cliente LIKE ? AND usuario.nombre LIKE ? ORDER BY ordenes_servicio.idorden DESC", [user, "%"+req.body.estatus+"%", "%"+req.body.tipo+"%", "%"+req.body.cliente+"%", "%"+req.body.usuario+"%"])
    //             .then(function (result) {
    //                 return res.json(result);
    //             });
    //     });
    // }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.then(function (p) {
            p.query('INSERT INTO ordenes_servicio set ?', [req.body]);
            res.json({ text: 'Orden creada' });
        });
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        console.log(req.body)
        await pool.then(function (p) {
            p.query('UPDATE ordenes_servicio set ? WHERE idorden = ?', [req.body, id]);
            res.json({ text: 'Orden Actualizado!' });
        })
    }

    public async delete(req: Request, res: Response) {

        const { id } = req.params;

        await pool.then(function (p) {
            p.query('DELETE FROM ordenes_servicio WHERE idorden = ?', [id]);
            res.json({ text: 'La orden fue eliminada' });
        })

    }

}

export const ordenController = new ordenesController();