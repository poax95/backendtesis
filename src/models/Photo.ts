import { Schema, model, Document} from "mongoose";

const schema = new Schema({
    title: String,
    description: String,
    precio: String,
    imagePath: String
});

interface IPhoto extends Document{
    title: string;
    description: string;
    precio: string;
    imagePath: string;
}

export default model<IPhoto>('Photo', schema);