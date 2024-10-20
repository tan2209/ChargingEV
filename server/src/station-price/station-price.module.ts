import { Module } from '@nestjs/common';

import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { StationChargePrice } from './station-price.model';
import { StationChargePriceController } from './station-price.controller';
import { StationChargePriceService } from './station-price.service';

@Module({
  imports: [TypegooseModule.forFeature([StationChargePrice])],
  controllers: [StationChargePriceController],
  providers: [StationChargePriceService],
  exports: [StationChargePriceService],
})
export class StationChargePriceModule {}