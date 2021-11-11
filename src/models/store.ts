import { Schema, model, Document} from "mongoose";

const schema = new Schema({
    nombre_tienda: String,
    usuario: String,
    instagram: String,
    twitter: String,
    facebook: String,
    numero_telefono: String,
    imagePath: String,
    imageUrl: String,
    descripcion: String,
    public_id: String,
});

interface IStore extends Document{
    nombre_tienda: string;
    usuario: string;
    instagram: string;
    twitter: string;
    facebook: string;
    numero_telefono: string;
    imagePath: string;
    imageUrl: string;
    public_id: string;
    descripcion: string;
}

export default model<IStore>('Store', schema);