import { Injectable } from '@nestjs/common';
import { MongoPrismaService } from '@app/database/mongo-prisma.service';
import { ErrorWhileCreating } from '@app/exceptions/custom.exception';
import { errorMessages } from '@app/common/constants/errorMessages';

@Injectable()
export class ProductQueriesService {
  constructor(private readonly mongoPrisma: MongoPrismaService) {}

  async createProduct(model: string, data: any) {
    const product = await this.mongoPrisma[model].create({
      data,
    });
    if (!product)
      throw new ErrorWhileCreating(errorMessages.errorWhileCreating);
    return product;
  }
}
