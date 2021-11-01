import {Request, Response} from 'express'
import user, { IUser } from '../models/user'; 

export const special = (req: Request, res: Response) => {
  
  return res.json({ msg: `Bienvenido ${req.body.email}!` });
};


