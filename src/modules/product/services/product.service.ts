import { Injectable } from '@nestjs/common';

import { CreateProductDTO } from '@app/modules/product/dto/createProduct.dto';
import { ProductQueriesService } from '@app/database/mongoDbQueries/productQueries.service';
import { modelNames } from '@app/database/modelNames';
import { GeneratorProvider } from '@app/common/providers/generator.provider';
import { successMessages } from '@app/common/constants/successMessages';

@Injectable()
export class ProductService {
  constructor(private readonly productQueries: ProductQueriesService) {}
  async createProduct(createProductDto: CreateProductDTO, user: any) {
    createProductDto.userId = user.id;
    createProductDto.uuid = GeneratorProvider.uuid();
    createProductDto.features.create.uuid = GeneratorProvider.uuid();
    const data = await this.productQueries.createProduct(
      modelNames.product,
      createProductDto,
    );
    return {
      data,
      message: successMessages.productHasBeenCreated,
    };
  }
}
