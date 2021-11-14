import { Schema, model, Document} from "mongoose";

const schema = new Schema({
    nombre: String,
    tienda: String,
    categoria: String,
    comentario: String,
    precio: String,
    imagePath: String,
    imageUrl: String,
    public_id: String,
    likes: {
        type: Number,
        default: 0
    },
    timestamp: {
        type:Date,
        default: Date.now
    },
    like: {
        type: Array,
        default: [],
      },


});

interface IPhoto extends Document{
    nombre: string;
    userId: string;
    tienda: string;
    categoria: string;
    comentario: string;
    precio: string;
    imagePath: string;
    imageUrl: string;
    public_id: string;
    likes: number;
    like: Array<string>;
    timestamp: Date;
}

export default model<IPhoto>('Photo', schema);