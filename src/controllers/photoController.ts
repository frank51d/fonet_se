import {Request, Response} from 'express';
import {Imagen} from '../models/imagen';
import path from 'path';
import fs from 'fs-extra';

import pool from '../database'

class photosController{

    public async create(req: Request, res: Response){
        
        const {idorden} = req.body;
        console.log('saving photo');
        console.log(req.file);

        const newPhoto = {
            idorden: idorden,
            codigo_foto: req.file.filename,
            imagePath: req.file.path
        }

        const photo: Imagen = newPhoto;

        console.log(photo);

        await pool.then(function(p){
            p.query('INSERT INTO code_foto set ?', [photo]);
        });

        return res.json({message:'Imagen guardada'});

    }

    
    public async list(req: Request, res: Response): Promise<void>{

        await pool.then(function(p){
            p.query('SELECT * FROM code_foto', function(error: any, result: any[]){
                if (error) throw (error);
                return res.json(result);
            });
        });

    }

    public async getByOrder(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;

        await pool.then(function(p){
            p.query('SELECT * FROM code_foto WHERE idorden = ?', [id])
                .then(function(result){   
                    return res.json(result);  
                });  
        });

    }

    public async delete(req: Request, res: Response) : Promise<any>{

        const {id} = req.params;
        let photo : any;
        
        await pool.then(function(p){
            p.query('SELECT * FROM code_foto WHERE idcode_foto = ?', [id])
                .then(function(result){    
                    if(result.length>0){
                        photo = result[0];
                        pool.then(function(p){
                            p.query('DELETE FROM code_foto WHERE idcode_foto = ?', [photo.idcode_foto]);
                            fs.unlink(path.resolve(photo.imagePath));
                        })
                        return res.json(result[0]);
                    }    
                });    
        });

        

    }

}

export const photoController = new photosController();