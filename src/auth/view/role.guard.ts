// import { Role } from '@/domain/Types';
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from './auth.decorator';

// interface UserWithRoles {
//   roles: Role[];
// }

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context
//       .switchToHttp()
//       .getRequest<{ user: UserWithRoles }>();

//     if (!user || !user.roles) {
//       return false;
//     }

//     return requiredRoles.some((role) => user.roles.includes(role));
//   }
// }
