import { Router } from 'express';
import { tipoOController } from '../controllers/tipoOrdenController';

class tipoOrdenRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', tipoOController.list);
        this.router.get('/:id', tipoOController.getOne);
        this.router.post('/', tipoOController.create);
        this.router.put('/:id', tipoOController.update);
        this.router.delete('/:id', tipoOController.delete);

    }

}

const tipoORoutes = new tipoOrdenRoutes();
export default tipoORoutes.router;