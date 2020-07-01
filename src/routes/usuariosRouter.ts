import { Router } from 'express';
import { usuarioController } from '../controllers/usuariosController';

class usuariosRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', usuarioController.list);
        this.router.get('/:id', usuarioController.showTecByID);
        this.router.post('/', usuarioController.create);
        this.router.post('/authenticate/', usuarioController.authenticate);
        this.router.put('/:id', usuarioController.update);
        this.router.delete('/:id', usuarioController.delete);

    }

}

const usuarioRoutes = new usuariosRoutes();
export default usuarioRoutes.router;