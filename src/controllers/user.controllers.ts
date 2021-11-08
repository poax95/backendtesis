import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";


function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    
    expiresIn: 86400
  });
}
//para registrarse
export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //validacion de email y contraseña
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Favor,ingresar correo y contraseña" });
  }
//se buscara y se revisara si el usuario ya existe
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "Usario ya existente" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Favor,ingresar correo y contraseña" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "El usuario no existe" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user),user: user.id });
  }

  return res.status(400).json({
    msg: "El email o contraseña son incorrectos"
  });
};






//funcion para mostrar los usuarios creados
export async function getUsers(req: Request, res: Response): Promise<Response>{
  const user = await User.find();
  return res.json(user);
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.json(user);
}
export async function deleteUser(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const user = await User.findByIdAndRemove(id);
  
  return res.json({
      message: 'usuario eliminado',
      user
  })
}

//para actualizar informacion de un usuario
export async function updateUser(req: Request, rest: Response): Promise<Response>{
  const { id } = req.params;
  const { nombre, apellido, rut, email, password } = req.body;
  await User.findByIdAndUpdate(id, {
     nombre,
     apellido,
     rut,
     email,
     password
     
  }, {new: true});
  return rest.json({
      message: 'actualizado correctamente',
      updateUser
  })

}

