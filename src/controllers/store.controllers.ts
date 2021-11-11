import{Request, Response} from 'express'
import path from 'path'
import fs from 'fs-extra'

import Store from '../models/store'; 
var  cloudinary  =  require ( 'cloudinary' ) . v2
cloudinary.config({
    cloud_name: 'dwj4gnrgb'||process.env.CLOUDINARY_CLOUD_NAME,
    api_key: '753126792965228'||process.env.CLOUDINARY_API_KEY,
    api_secret: 'v1C4eYo80bAXmTid3T1xowCZBfE'||process.env.CLOUDINARY_API_SECRET,
});

export async function getStores(req: Request, res: Response): Promise<Response>{
    const stores = await Store.find();
    return res.json(stores);
}

export async function getStoreUser(req: Request, res: Response): Promise<Response>{
    const usuario = req.params.user;
    //console.log(usuario)
    const storeUser = await Store.findOne({
        usuario: usuario
    });
    //console.log(storeUser)
    return res.json(storeUser);
}

export async function getStore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const store = await Store.findById(id);
    return res.json(store);
}
     //datos que se entregaran al crear tienda
export async function createStore(req: Request, res: Response): Promise<Response>
 {

    const{ nombre_tienda,usuario, instagram , twitter, facebook, numero_telefono, descripcion } = req.body;
    console.log(req.file?.path)
    const result = await cloudinary.uploader.upload(req.file?.path)
    const newStore = {
        nombre_tienda: nombre_tienda,
        usuario: usuario,
        instagram: instagram,
        twitter: twitter,
        facebook: facebook,
        numero_telefono: numero_telefono,
        imagePath: req.file?.path,
        descripcion: descripcion,
        imageUrl: result.url,
        public_id: result.public_id,
     
    };
    const store = new Store(newStore);
    await store.save();
    
    return res.json({
        message: 'Tienda guardada exitosamente',
        store
    })

};
//funcion para eliminar tienda
export async function deleteStore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const store = await Store.findByIdAndRemove(id);
    if (store) {
        await fs.unlink(path.resolve(store.imagePath))
    }
    return res.json({
        message: 'tienda eliminada',
        store
    })
}

//para actualizar informacion de una foto
export async function updateStore(req: Request, rest: Response): Promise<Response>{
    const { id } = req.params;
    const { nombre_tienda, instagram , twitter , facebook , numero_telefono, descripcion } = req.body;
    await Store.findByIdAndUpdate(id, {
       nombre_tienda,
       instagram,
       twitter,
       facebook, 
       numero_telefono,
       descripcion
    }, {new: true});
    return rest.json({
        message: 'actualizado correctamente',
        updateStore
    })

}