import {Request, Response} from 'express';

import pool from '../database'

class usuariosController{

    public async authenticate(req: Request, res: Response): Promise<void>{

        console.log(req.body)

        //await pool.then(function(p){
         //   p.query('SELECT * FROM usuarios', function(error: any, result: any[]){
           //     if (error) throw (error);
           //     return res.json(result);
          //  });
       // });
    }

    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT usuario.id, usuario.nombre, usuario.nombre_usuario FROM usuario', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });
    }

    public async showTecByID(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;

        await pool.then(function(p){
            p.query('SELECT * FROM usuario WHERE id = ?', [id])
                .then(function(result){
                    if(result.length>0){
                        return res.json(result[0]);
                    }
                });  
        });

    }

    public async create(req: Request, res: Response): Promise<void>{
        await pool.then(function(p){
            p.query('INSERT INTO usuario set ?', [req.body]);
        });
        res.json({message: 'Usuario creado...'});
    }

    public async update(req: Request, res: Response){
        const {id} = req.params;

        await pool.then(function(p){
            p.query('UPDATE usuario set ? WHERE id = ?', [req.body, id]);
            res.json({text: 'Usuario Actualizado!'});
        })
    }

    public async delete(req: Request, res: Response){

        const {id} = req.params;

        await pool.then(function(p){
            p.query('DELETE FROM usuario WHERE id = ?', [id]);
            res.json({text: 'El material fue eliminado'});
        })

    }

}

export const usuarioController = new usuariosController();