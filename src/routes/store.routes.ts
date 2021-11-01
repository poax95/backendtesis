import {Router} from 'express';
import passport from "passport";
const router = Router();

import {createStore, getStores, getStore, deleteStore, updateStore} from '../controllers/store.controllers'


import multer from '../libs/multer'

router.route('/store')
    .get(getStores)
    .post(multer.single('image'), createStore)
    
router.route('/store/:id')
    .get(getStore)
    .put(updateStore)
router.delete(
    '/store/:id',
    passport.authenticate("jwt", { session: false }),
     deleteStore
);
export default router;