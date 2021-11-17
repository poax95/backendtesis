import {Router} from 'express';
import passport from "passport";
const router = Router();

import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto, likes, like,isliked, isliked2, searchPhotos} from '../controllers/Photo.controllers'
import { searchStore } from '../controllers/store.controllers';


import multer from '../libs/multer'
import Photo from '../models/Photo';

//----------------------------obtener todos los productos y crearlos-----------------------------------------------------
router.route('/newpr')
    .get(getPhotos)
    .post(multer.single('image'), createPhoto)

//-----------------------------ruta producto con su id--------------------------------------------------------------------    
router.route('/newpr/:id')
    .get(getPhoto)
    .put(updatePhoto)
router.route('/edit_product/:id')
    .put(updatePhoto)  
    
//-------------------------------rutas para likes-----------------------------------------------------------------------    
router.post("/producto/:id/:userId",like); 
router.get("/producto/:id/:userId",isliked2);
   
//-------------------------------para eliminar un producto en especifico-----------------------------------------------
router.delete(
    '/newpr/:id',
    passport.authenticate("jwt", { session: false }),
     deletePhoto
);
    
router.get("/producto/categoria",searchPhotos); 

router.post('/irstore',searchStore);


export default router;
