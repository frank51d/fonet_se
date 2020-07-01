import { Router } from 'express';
import { plataforController } from '../controllers/plataformController';

class plataformRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', plataforController.list);
        this.router.get('/:id', plataforController.getOne);
        this.router.post('/', plataforController.create);
        this.router.put('/:id', plataforController.update);
        this.router.delete('/:id', plataforController.delete);

    }

}

const plataforRoutes = new plataformRoutes();
export default plataforRoutes.router;