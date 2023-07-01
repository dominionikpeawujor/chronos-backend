import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, FilterProductDTO } from './dto';

@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filterProducts = await this.productService.getFilteredProducts(
        filterProductDTO,
      );
      return filterProducts;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  @Post('/')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const newProduct = await this.productService.addProduct(createProductDTO);
    return newProduct;
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);
    if (!deletedProduct) throw new NotFoundException('Product does not exist');
    return deletedProduct;
  }
}
