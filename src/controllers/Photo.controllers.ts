import{Request, Response} from 'express'
import path from 'path'
import fs from 'fs-extra'

import Photo from '../models/Photo'

export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}
     //datos que se entregaran al subir foto
export async function createPhoto(req: Request, res: Response): Promise<Response>
 {

    const{ nombre, tienda,categoria , comentario, precio } = req.body;
    console.log(req.file?.path)
    const newPhoto = {
        nombre: nombre,
        tienda: tienda,
        categoria: categoria,
        comentario: comentario,
        precio: precio,
        imagePath: req.file?.path
     
    };
    const photo = new Photo(newPhoto);
    await photo.save();
    
    return res.json({
        message: 'foto guardada exitosamente',
        photo
    })

};
//funcion para eliminar foto
export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath))
    }
    return res.json({
        message: 'foto eliminada',
        photo
    })
}

//para actualizar informacion de una foto
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