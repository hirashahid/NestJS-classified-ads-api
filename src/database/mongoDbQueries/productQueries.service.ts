import { Injectable } from '@nestjs/common';
import { MongoPrismaService } from '@app/database/mongo-prisma.service';

@Injectable()
export class ProductQueriesService {
  constructor(private readonly mongoPrisma: MongoPrismaService) {}

  async createProduct(model: string, data: any) {
    try {
      const product = await this.mongoPrisma[model].create({
        data,
      });
      return product;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}
