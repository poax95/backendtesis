import {Router} from 'express';
import passport from "passport";
const router = Router();

import {createStore, getStores, getStore, deleteStore, updateStore, getStoreUser, searchStore} from '../controllers/store.controllers'


import multer from '../libs/multer'

router.route('/store')
    .get(getStores)
    .post(multer.single('image'), createStore)
router.route('/stores/:user')
    .get(getStoreUser)  
  
  
    
router.route('/store/:id')
    .get(getStore)
    .put(updateStore)
router.delete(
    '/store/:id',
    
     deleteStore
);
export default router;