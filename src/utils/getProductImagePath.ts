import { Request } from "express";

export function getProductImagePath(request:Request,fileName:String){
    return `http://${request.hostname}/static/${fileName}`;
}