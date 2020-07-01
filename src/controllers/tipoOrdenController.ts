import {Request, Response} from 'express';

import pool from '../database'

class tipoOrdenController{

    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT * FROM tipo_orden', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async getOne(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;

        await pool.then(function(p){
            p.query('SELECT * FROM tipo_orden WHERE idtipo_orden = ?', [id])
                .then(function(result){
                    if(result.length>0){
                        return res.json(result[0]);
                    }
                });  
        });

    }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.then(function(p){
            p.query('INSERT INTO tipo_orden set ?', [req.body]);
        });
        res.json({message: 'Tipo de Orden creado...'});
    }

    public async update(req: Request, res: Response){
        const {id} = req.params;

        await pool.then(function(p){
            p.query('UPDATE tipo_orden set ? WHERE idtipo_orden = ?', [req.body, id]);
            res.json({text: 'Tipo de Orden Actualizado!'});
        })
    }

    public async delete(req: Request, res: Response){

        const {id} = req.params;

        await pool.then(function(p){
            p.query('DELETE FROM tipo_orden WHERE idtipo_orden = ?', [id]);
            res.json({text: 'El tipo de orden fue eliminado'});
        })

    }

}

export const tipoOController = new tipoOrdenController();