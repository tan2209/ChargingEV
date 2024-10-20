import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { OrderService} from './orders.service';
import { Order } from './orders.model';
import { OrderController } from './order.controller';
import { StationChargePriceModule } from 'src/station-price/station-price.module';

@Module({
  imports: [
    StationChargePriceModule,
    TypegooseModule.forFeature([Order]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrdersModule {}