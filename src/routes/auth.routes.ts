import {Router} from 'express'
import {
  getUser,
  signIn,
  signUp,
} from '../controllers/user.controllers'

import {  getUsers } from '../controllers/user.controllers';

const router = Router();
 
router.post('/registro', signUp);
router.post('/login', signIn);

router.route('/user')
    .get(getUsers)

router.route('/user/:id')
    .get(getUser)     

export default router;