import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/roles/roles.entity";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)


