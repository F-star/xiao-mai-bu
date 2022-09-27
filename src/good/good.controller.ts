import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GoodService } from './good.service';

@Controller('good')
export class GoodController {
  constructor(private goodService: GoodService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodService.findOne(id);
  }

  @Post('create/:id')
  updateOrCreate(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
  ) {
    return this.goodService.updateOrCreate(id, name, price);
  }
}
