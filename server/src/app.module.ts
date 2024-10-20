import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ControlDeviceModule } from './control-device/control-device.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';

import { StationChargePriceModule } from './station-price/station-price.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChargingStationModule } from './pulldataset/charging-station.module';
import { ChargingStationTestModule } from './chargingstation/chargingstation.module';
import { UsersModule } from './users/users.module';
import { WebApiModule } from './webapi/webapi.module';

@Module({

  imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
       uri: configService.get<string>('MONGODB_URI'),
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000,
    }),
    inject: [ConfigService],
  }),
    ControlDeviceModule, 
    PaymentModule, 
    AuthModule, 
    UsersModule,
    StationChargePriceModule,
    OrdersModule,
    ChargingStationModule,
    ChargingStationTestModule,
    WebApiModule
  ],

  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
  
}
