import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import {  WebApiService} from './webapi.service';
import { WebApiController } from './webapi.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.model';
import { ChargingStationModule } from 'src/pulldataset/charging-station.module';
import { ChargingStation } from 'src/pulldataset/charging-station.model';
import { ChargingTest } from 'src/chargingstation/chargingstation.model';
import { Order } from 'src/orders/orders.model';


@Module({
  imports: [
    TypegooseModule.forFeature([User,ChargingStation,ChargingTest,Order]), AuthModule, ChargingStationModule
  ],
  providers: [WebApiService],
  controllers: [WebApiController],
  exports: [WebApiService],
})
export class WebApiModule {}