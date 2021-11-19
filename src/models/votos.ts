import { Schema, model, Document} from "mongoose";

const schema = new Schema({
    idProducto: String,
    idUsuario: String,
    likes: Number,
    
});

interface ILikes extends Document{
    idProducto: string;
    idUsuario: string;
    likes: number;
}

export default model<ILikes>('Likes', schema);