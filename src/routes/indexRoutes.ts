import { Router } from 'express';
import { indexController } from './../controllers/indexController';

class IndexRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', indexController.index);
        this.router.get('/backup', indexController.backup);

    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;