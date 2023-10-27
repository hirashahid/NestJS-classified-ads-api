import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor(private prisma: PostgresPrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['http-x-api-token'];

    if (!token) {
      return false;
    }

    const tokenExist = await this.prisma.apiKey.findUnique({
      where: { token },
    });

    return !!tokenExist;
  }
}
