import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  tiendaId: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>
  isAdmin: boolean;
};

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tiendaId: String,

  

});
//cifrado de contraseña
userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();
  

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});
//para comprobar contraseñas
userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);