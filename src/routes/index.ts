import {Router} from 'express';
const router = Router();

import {createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto} from '../controllers/Photo.controllers'


import multer from '../libs/multer'

router.route('/newpr')
    .get(getPhotos)
    .post(multer.single('image'), createPhoto)
    
router.route('/newpr/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto)
  


export default router;
