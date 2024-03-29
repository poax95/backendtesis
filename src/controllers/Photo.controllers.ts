import{Request, Response} from 'express'
import path from 'path'
import fs, { promises } from 'fs-extra'
import { Mongoose } from 'mongoose'




import Photo from '../models/Photo'
import { Db } from 'mongoose/node_modules/mongodb'
import user from '../models/user'
//-----------------------------------conexion a cloudinary para subir las fotos-------------------------------------------------
var  cloudinary  =  require ( 'cloudinary' ) . v2
cloudinary.config({
    cloud_name: 'dwj4gnrgb'||process.env.CLOUDINARY_CLOUD_NAME,
    api_key: '753126792965228'||process.env.CLOUDINARY_API_KEY,
    api_secret: 'v1C4eYo80bAXmTid3T1xowCZBfE'||process.env.CLOUDINARY_API_SECRET,
});
//------------------------------------------------------------------------------------------------------------------------------
export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}
     //----------------------------datos que se entregaran al subir el producto--------------------------------------------------
export async function createPhoto(req: Request, res: Response): Promise<Response>
 {

    const{ nombre, tienda,categoria , comentario, precio } = req.body;
    //console.log(req.file?.path)
    const result = await cloudinary.uploader.upload(req.file?.path)
    console.log(result)
    const newPhoto = {
        nombre: nombre,
        tienda: tienda,
        categoria: categoria,
        comentario: comentario,
        precio: precio,
        imagePath: req.file?.path,
        imageUrl: result.url,
        public_id: result.public_id,
        
     
    };
    const photo = new Photo(newPhoto);
    await photo.save();
    
    return res.json({
        message: 'foto guardada exitosamente',
        photo
    })

};
//----------------------------------------funcion para eliminar foto-----------------------------------------------------------
export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    await cloudinary.uploader.destroy(photo?.public_id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath))
    }
    return res.json({
        message: 'foto eliminada',
        photo
    })
}

//---------------------------------------para actualizar informacion de una foto------------------------------------------------
export async function updatePhoto(req: Request, rest: Response): Promise<Response>{
    const { id } = req.params;
    const { nombre, tienda, categoria, comentario, precio } = req.body;
    await Photo.findByIdAndUpdate(id, {
       nombre,
       tienda,
       categoria,
       comentario, 
       precio
    }, {new: true});
    return rest.json({
        message: 'actualizado correctamente',
        updatePhoto
    })

}

export const likes = async (req: Request, res: Response) => {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    //console.log(photo);
    if (photo) {
      photo.likes = photo.likes + 1;
      await photo.save();
      res.json({ likes: photo.likes });
    } else {
      res.status(500).json({ error: "Internal Error" });
    }
  }
//---------------------------------------funcion para controlar el envio de likes----------------------------------------------
  export const like = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const { userId } = req.params;
    const photo = await Photo.findById(id);
    //si no encuentra la id de usuario en el arreglo agrega el id al arreglo y aumenta el contador
    if (!photo.like.includes(userId)) {
        await photo.updateOne({ $push: { like: userId } });
        photo.likes = photo.likes + 1;
        await photo.save();
        //console.log(photo.likes)
        res.status(200).json("Me gusta realizado");
      } else {
        await photo.updateOne({ $pull: { like: userId } });
        photo.likes = photo.likes - 1;
        await photo.save();
        res.status(200).json("Me gusta borrado");
        
        //console.log(photo.likes)
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

//-----------------------------------------se revisara si tiene el like---------------------------------------------------------
export const isliked = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  const { userId } = req.params;
  const photo = await Photo.findById(id);
  //si no encuentra la id de usuario en el arreglo agrega el id al arreglo y aumenta el contador
  if (!photo.like.includes(userId)) {
      
      res.status(200).json({message: 'unlike'});
      console.log(true)
      return(true)
    } else {
      

      res.status(200).json({message: 'like'});
      console.log(false)
      return(false)
      //console.log(photo.likes)
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
//------------------------------------funcion utilizada para la revision del like activo-------------------------------------------------------
export const isliked2 = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  const { userId } = req.params;
  const photo = await Photo.findById(id);
  //si no encuentra la id de usuario en el arreglo agrega el id al arreglo y aumenta el contador
  if (!photo.like.includes(userId) ) {
      
      res.status(200).json({like: photo.like,unliked: false});
     
      
    } else {
      

      res.status(200).json({like: photo.like,liked: true});
      
      //console.log(photo.likes)
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
//---------------------------------------------------------------------------------------------------------------------------
export async function getislikedPhoto(req: Request, res: Response): Promise<boolean> {
  let isliked=true;
  const { id } = req.params;
  const { userId } = req.params;
  const photo = await Photo.findById(id);
  if (!photo.like.includes(userId)) {
    isliked=false;
    console.log("falso")
    return(isliked)

  } else {
    isliked=true
    console.log(true)
    return(isliked)

}
}

//-------------------------------------------busqueda de fotos---------------------------------------------------------------
export async function searchPhotos(req: Request, res: Response): Promise<Response>{
  const { categoria } = req.body;
  
  const photos = await Photo.find({categoria :categoria});

  return res.json(photos);
}

