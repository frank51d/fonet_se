import {Request, Response} from 'express';

import pool from '../database'

class plataformController{

    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT * FROM plataforma', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async getOne(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;

        await pool.then(function(p){
            p.query('SELECT * FROM plataforma WHERE idplataforma = ?', [id])
                .then(function(result){
                    
                        return res.json(result[0]);
                    
                });  
        });

    }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.then(function(p){
            p.query('INSERT INTO plataforma set ?', [req.body]);
        });
        res.json({message: 'Usuario creado...'});
    }

    public async update(req: Request, res: Response){
        const {id} = req.params;

        await pool.then(function(p){
            p.query('UPDATE plataforma set ? WHERE idplataforma = ?', [req.body, id]);
            res.json({text: 'Usuario Actualizado!'});
        })
    }

    public async delete(req: Request, res: Response){

        const {id} = req.params;

        await pool.then(function(p){
            p.query('DELETE FROM platafoma WHERE idplataforma = ?', [id]);
            res.json({text: 'El material fue eliminado'});
        })

    }

}

export const plataforController = new plataformController();