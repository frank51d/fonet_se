import { Router } from 'express';
import { chartController } from '../controllers/chartController';

class chartsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/tecnicos', chartController.list);
        this.router.get('/meses', chartController.ordenesMes);
        this.router.get('/meses/:user', chartController.ordenesMesByTec);
        this.router.get('/count', chartController.howManyTodas);
        this.router.get('/count/:user', chartController.howManyOrder);
        this.router.get('/tipoOrden/:user', chartController.howManyOrderByType);

    }

}

const chartRoutes = new chartsRoutes();
export default chartRoutes.router;