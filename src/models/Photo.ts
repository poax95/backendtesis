import { Schema, model, Document} from "mongoose";

const schema = new Schema({
    nombre: String,
    tienda: String,
    categoria: String,
    comentario: String,
    precio: String,
    imagePath: String
});

interface IPhoto extends Document{
    nombre: string;
    tienda: string;
    categoria: string;
    comentario: string;
    precio: string;
    imagePath: string;
}

export default model<IPhoto>('Photo', schema);