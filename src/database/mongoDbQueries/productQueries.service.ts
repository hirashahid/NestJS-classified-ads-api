import { Injectable } from '@nestjs/common';
import { MongoPrismaService } from '@app/database/mongo-prisma.service';
import { errorMessages } from '@app/common/constants/errorMessages';
import { NotFoundException } from '@app/exceptions/custom.exception';
import { successMessages } from '@app/common/constants/successMessages';
import { modelNames } from '@app/database/modelNames';
import { FilterProductDTO } from '@app/modules/product/dto/filterProduct.dto';

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

  async getProducts(model: string, query: FilterProductDTO) {
    query.paginate = query.paginate ? query.paginate : 15;
    query.page = query.page ? query.page : 1;
    const skip = (query.page - 1) * query.paginate;

    const products = await this.mongoPrisma[model].findMany({
      include: {
        features: true,
      },
      skip: skip,
      take: query.paginate,
    });

    return {
      data: products,
      total: products?.length,
      meta: {
        total: products?.length,
        currentPage: query.page,
        eachPage: query.paginate,
        lastPage: Math.ceil(products?.length / query.paginate),
      },
    };
  }

  async getProductById(model: string, id: string) {
    const product = await this.mongoPrisma[model].findUnique({
      where: { id },
      include: {
        features: true,
      },
    });
    if (!product) throw new NotFoundException(errorMessages.productNotFound);
    return product;
  }

  async deleteProduct(model: string, id: string) {
    const product = await this.mongoPrisma[model].findUnique({
      where: { id },
      include: {
        features: true,
      },
    });

    if (!product) {
      throw new NotFoundException(errorMessages.productNotFound);
    }

    const featuresToDelete = product.features;

    for (const feature of featuresToDelete) {
      await this.mongoPrisma[modelNames.feature].delete({
        where: { id: feature.id },
      });
    }
    try {
      await this.mongoPrisma[model].delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return { message: successMessages.productHasBeenDeleted };
  }
}
