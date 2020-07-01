import { Router } from 'express';
import { photoController } from '../controllers/photoController';
import multer from '../libs/multer';

class photosRoutes{

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(){

        this.router.get('/', photoController.list);  
        this.router.get('/:id', photoController.getByOrder);  
        this.router.post('/', multer.single('image'), photoController.create);
        this.router.delete('/:id', photoController.delete)
        

    }

}

const photoRoutes = new photosRoutes();
export default photoRoutes.router;