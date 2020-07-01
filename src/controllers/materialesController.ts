import {Request, Response} from 'express';

import pool from '../database'

class materialesController{

    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT * FROM materiales', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async getOne(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;

        await pool.then(function(p){
            p.query('SELECT * FROM materiales WHERE idmaterial = ?', [id])
                .then(function(result){
                    if(result.length>0){
                        return res.json(result[0]);
                    }
                });  
        });

    }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.then(function(p){
            p.query('INSERT INTO materiales set ?', [req.body]);
        });
        res.json({message: 'Material creado...'});
    }

    public async update(req: Request, res: Response){
        const {id} = req.params;

        await pool.then(function(p){
            p.query('UPDATE materiales set ? WHERE idmaterial = ?', [req.body, id]);
            res.json({text: 'Material Actualizado!'});
        })
    }

    public async delete(req: Request, res: Response){

        const {id} = req.params;

        await pool.then(function(p){
            p.query('DELETE FROM materiales WHERE idmaterial = ?', [id]);
            res.json({text: 'El material fue eliminado'});
        })

    }

}

export const materialController = new materialesController();