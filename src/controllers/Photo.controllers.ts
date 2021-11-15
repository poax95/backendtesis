import{Request, Response} from 'express'
import path from 'path'
import fs from 'fs-extra'



import Photo from '../models/Photo'
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
    console.log(req.file?.path)
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
      console.log(true)
      res.status(200).json({message: 'no tenia like'});
      return(true)
    } else {
      console.log(false)

      res.status(200).json({message: 'tenia like'});
      return(false)
      //console.log(photo.likes)
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

