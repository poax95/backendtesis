import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

//guarda la imagen en la cadeta upload y lo renombra con su extension
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

export default multer({storage});