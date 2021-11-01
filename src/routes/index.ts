import {Router} from 'express';
import passport from "passport";
const router = Router();

import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto} from '../controllers/Photo.controllers'


import multer from '../libs/multer'

router.route('/newpr')
    .get(getPhotos)
    .post(multer.single('image'), createPhoto)
    
router.route('/newpr/:id')
    .get(getPhoto)
    .put(updatePhoto)
router.delete(
    '/newpr/:id',
    passport.authenticate("jwt", { session: false }),
     deletePhoto
);
    
  


export default router;
