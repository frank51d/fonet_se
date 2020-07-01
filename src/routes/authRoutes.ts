import { Router } from 'express';
import { authController } from '../controllers/authController';

class autheRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', authController.list);

    }

}

const authRoutes = new autheRoutes();
export default authRoutes.router;