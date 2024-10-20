import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ChargingStationTestService} from './chargingstation.service';
import { ChargingTest } from './chargingstation.model';
import {ChargingStationTestController } from './chargingstation.controller';


@Module({
  imports: [
    TypegooseModule.forFeature([ChargingTest]),
  ],
  providers: [ChargingStationTestService],
  controllers: [ChargingStationTestController],
  exports: [ChargingStationTestService],
})
export class ChargingStationTestModule {}