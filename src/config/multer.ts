import { Options, diskStorage } from 'multer';
import{resolve} from 'path';
import { randomBytes } from 'crypto';

export const multerImageConfig = {
    dest: resolve(__dirname,'..','..','public','uploads','products'),
    storage : diskStorage({
        destination: (request,file, callback)=>{
            callback(null,resolve(__dirname,'..','..','public','uploads','products'))
        },
        filename: (request,file, callback)=>{
            randomBytes(16,(error,hash)=>{
                if(error){
                    callback(error,file.filename)                    
                }else{
                    const filename = `${hash.toString('hex')}.png`;
                    callback(null,filename)
                }
            })
        },
    }),
    limits: {
        fileSize: 5*1024*1024 // 5MB
    },
    fileFilter: (request,file, callback)=>{
        const formats = ['image/jpeg', 'image/png', 'image/jpg'];

        if(formats.includes(file.mimetype)){
            callback(null,true);
        }else{
            callback(new Error('Invalid Image Format'))
        }
        

    }
} as Options;