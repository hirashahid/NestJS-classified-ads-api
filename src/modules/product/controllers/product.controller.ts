import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@app/decorators/user.decorator';
import { ProductService } from '@app/modules/product/services/product.service';
import { CreateProductDTO } from '@app/modules/product/dto/createProduct.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(
    @Body() createBlogDto: CreateProductDTO,
    @User() user: any,
  ) {
    const { data, message } = await this.productService.createProduct(
      createBlogDto,
      user,
    );
    return { message, data };
  }
}
