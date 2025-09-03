import { Operation } from "./operation";

export interface PermissionDto {
  role: string;
  operations: Operation[];
}
