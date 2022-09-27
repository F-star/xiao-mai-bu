import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodModule } from './good/good.module';
import { GoodController } from './good/good.controller';
import { GoodService } from './good/good.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoodModule,
  ],
  controllers: [AppController, GoodController],
  providers: [AppService, GoodService],
})
export class AppModule {}
