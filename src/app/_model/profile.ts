import { Role } from "./role";

export interface Profile {
    id:number;
    username:string;
    name:string;
    role:Role;
    authorities:[];
}