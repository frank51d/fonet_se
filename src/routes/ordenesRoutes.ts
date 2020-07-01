import { Router } from 'express';
import { ordenController } from '../controllers/ordenesController'

class ordenesRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', ordenController.list);
        this.router.get('/:id', ordenController.getOne);
        this.router.get('/listar/:user', ordenController.listTecnico);
        this.router.post('/listar/fill/', ordenController.filtrado);
        this.router.post('/', ordenController.create);
        this.router.put('/:id', ordenController.update);
        this.router.delete('/:id', ordenController.delete);

    }

}

const ordenRoutes = new ordenesRoutes();
export default ordenRoutes.router;