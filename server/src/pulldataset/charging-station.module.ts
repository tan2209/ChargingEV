import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ChargingStationService } from './charging-station.service';
import { ChargingStationController } from './charging-station.controller';
import { ChargingStation } from './charging-station.model';

@Module({
  imports: [TypegooseModule.forFeature([ChargingStation])],
  providers: [ChargingStationService],
  controllers: [ChargingStationController],
})
export class ChargingStationModule {}
