import { Router } from 'express';
import { reportController } from '../controllers/reportController';

class reportsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.post('/full', reportController.list);
        this.router.post('/fecha', reportController.intervalo);
        this.router.post('/detallado/1', reportController.countTipoByTec);
        this.router.post('/detallado/2', reportController.countStatusByTec);
        this.router.post('/detallado/3', reportController.countAllByTipo);
        this.router.post('/detallado/4', reportController.countAllByStatus);
        this.router.post('/detallado/5', reportController.countAllSameDay);
        this.router.post('/detallado/6', reportController.countAll1Day);
        this.router.post('/detallado/7', reportController.countAllMore2Day);
        this.router.get('/detallado/8', reportController.avg);
    }

}

const reportRoutes = new reportsRoutes();
export default reportRoutes.router;