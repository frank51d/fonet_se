import { Router } from 'express';
import { materialController } from '../controllers/materialesController';

class materialesRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', materialController.list);
        this.router.get('/:id', materialController.getOne);
        this.router.post('/', materialController.create);
        this.router.put('/:id', materialController.update);
        this.router.delete('/:id', materialController.delete);

    }

}

const materialRoutes = new materialesRoutes();
export default materialRoutes.router;