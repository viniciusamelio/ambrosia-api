import { Request } from "express";

export function getHostname(request:Request){
    return `http://${request.hostname}/`;
}