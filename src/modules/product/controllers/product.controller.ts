import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@app/decorators/user.decorator';
import { ProductService } from '@app/modules/product/services/product.service';
import { CreateProductDTO } from '@app/modules/product/dto/createProduct.dto';
import { FilterProductDTO } from '@app/modules/product/dto/filterProduct.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createBlogDto: CreateProductDTO,
    @User() user: any,
  ) {
    return await this.productService.createProduct(createBlogDto, user);
  }

  @Get()
  async getAllProducts(@Query() query: FilterProductDTO) {
    return await this.productService.getProducts(query);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
