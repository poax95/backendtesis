import {Router} from 'express';
import passport from "passport";
const router = Router();

import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto, likes, like,isliked, isliked2 } from '../controllers/Photo.controllers'


import multer from '../libs/multer'
import Photo from '../models/Photo';

router.route('/newpr')
    .get(getPhotos)
    .post(multer.single('image'), createPhoto)
    
router.route('/newpr/:id')
    .get(getPhoto)
    .put(updatePhoto)
router.route('/edit_product/:id')
    .put(updatePhoto)   
router.post("/producto/:id/:userId",like); 
router.get("/producto/:id/:userId",isliked2);   

router.delete(
    '/newpr/:id',
    passport.authenticate("jwt", { session: false }),
     deletePhoto
);
    
  


export default router;
