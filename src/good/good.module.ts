import { Module } from '@nestjs/common';
import { GoodController } from './good.controller';
import { GoodService } from './good.service';

@Module({
  imports: [],
  controllers: [GoodController],
  providers: [GoodService],
})
export class GoodModule {}
