import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const UserParam = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const {iat, exp, ...user} =  request.user;
        return user;
    },
);
