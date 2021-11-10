import {Router} from 'express'
import {
  deleteUser,
  getUser,
  signIn,
  signUp,
  updateUser,
} from '../controllers/user.controllers'

import {  getUsers } from '../controllers/user.controllers';
import passport from "passport";

const router = Router();
 
router.post('/registro', signUp);
router.post('/login', signIn);

router.route('/user')
    .get(getUsers)

router.route('/user/:id')
    .get(getUser)
    .put(updateUser) 
router.delete(
    '/user/:id',
    
    deleteUser
  );        

export default router;