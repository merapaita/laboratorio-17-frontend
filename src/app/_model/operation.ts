import { Module } from "./module";

export interface Operation {
    id:number;
    name:string;
    path:string;
    httpMethod:string;
    permitAll:boolean;
    module: Module;
    select:boolean;
}