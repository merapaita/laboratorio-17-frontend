import { Operation } from "./operation";
import { Role } from "./role";

export interface GrantedPermission {
    id:number;
    role:Role;
    operation:Operation;
}