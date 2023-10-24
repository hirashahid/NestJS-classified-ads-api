import { Injectable } from '@nestjs/common';

import { CreateProductDTO } from '@app/modules/product/dto/createProduct.dto';
import { ProductQueriesService } from '@app/database/mongoDbQueries/productQueries.service';
import { modelNames } from '@app/database/modelNames';
import { FilterProductDTO } from '../dto/filterProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productQueries: ProductQueriesService) {}

  async createProduct(createProductDto: CreateProductDTO, user: any) {
    createProductDto.userId = user.id;
    return await this.productQueries.createProduct(
      modelNames.product,
      createProductDto,
    );
  }

  async getProducts(query: FilterProductDTO) {
    return await this.productQueries.getProducts(modelNames.product, query);
  }

  async getProductById(id: string) {
    return await this.productQueries.getProductById(modelNames.product, id);
  }

  async deleteProduct(id: string) {
    return await this.productQueries.deleteProduct(modelNames.product, id);
  }
}
