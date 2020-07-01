import {Request, Response} from 'express';

import pool from '../database'

class materialesUtiController{

    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT * FROM materiales_utilizados', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async getByOrder(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;

        await pool.then(function(p){
            p.query('SELECT materiales_utilizados.idorden, materiales_utilizados.idmaterial, materiales.descripcion, materiales_utilizados.cantidad  FROM materiales INNER JOIN materiales_utilizados ON materiales.idmaterial = materiales_utilizados.idmaterial INNER JOIN ordenes_servicio ON ordenes_servicio.idorden = materiales_utilizados.idorden WHERE ordenes_servicio.idorden = ?', [id])
                .then(function(result){
                    
                        return res.json(result);
                    
                });  
        });

    }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.then(function(p){
            p.query('INSERT INTO materiales_utilizados set ?', [req.body]);
        });
        res.json({message: 'Material creado...'});
    }

}

export const materialUtiController = new materialesUtiController();