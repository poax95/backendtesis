import {Router} from 'express'
import {
  deleteUser,
  getUser,
  resetPassword,
  searchUser,
  signIn,
  signUp,
  updateUser,
} from '../controllers/user.controllers'

import {  getUsers } from '../controllers/user.controllers';
import passport from "passport";

const router = Router();
 
router.post('/registro', signUp);
router.post('/login', signIn);
//-----------------------------------para recuperar contraseñas----------------------------------------------------------
router.post('/resetpassword', searchUser);
router.post('/newpassword/:id', resetPassword);

router.route('/user')
    .get(getUsers)

router.route('/user/:id')
    .get(getUser)
    .put(updateUser) 
router.delete(
    '/user/:id',
    passport.authenticate("jwt", { session: false }),
    deleteUser
  );        

export default router;