import{Request, Response} from 'express'
import Votos from '../models/votos';

     //datos que se entregaran al subir el voto
     export async function guardarVoto(req: Request, res: Response): Promise<Response>
     {
    
        const{ idProducto,idUsuario,Likes} = req.body;
        const newVoto = {
            idProducto: idProducto,
            idUsuario: idUsuario,
            Likes:Likes,
        };
        const votos = new Votos(newVoto);
        await votos.save();
        
        return res.json({
            message: 'Voto guardado exitosamente',
            votos
        })
    
    };