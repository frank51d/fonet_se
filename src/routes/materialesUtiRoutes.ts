import { Router } from 'express';
import { materialUtiController } from '../controllers/materialesUtiController';

class materialesUtiRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', materialUtiController.list);
        this.router.get('/:id', materialUtiController.getByOrder);
        this.router.post('/', materialUtiController.create);
        //this.router.put('/:id', materialController.update);
        //this.router.delete('/:id', materialController.delete);

    }

}

const materialUtiRoutes = new materialesUtiRoutes();
export default materialUtiRoutes.router;