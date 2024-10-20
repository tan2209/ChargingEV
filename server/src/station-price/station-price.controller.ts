import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StationChargePriceService } from './station-price.service';
import { StationChargePrice } from './station-price.model';

@Controller('station-charge-prices')
export class StationChargePriceController {
  constructor(private readonly stationChargePriceService: StationChargePriceService) {}

  @Post('stationName')
  async createOrUpdateStationChargePrice(
    @Body() body: {stationName: string, pricePerKwh: number, Wattage: number },
  ): Promise<StationChargePrice> {
    const { pricePerKwh, stationName, Wattage } = body;
    return this.stationChargePriceService.createOrUpdateStationChargePrice(stationName, pricePerKwh, Wattage);
  }

  @Get(':stationName')
  async getStationChargePrice(@Param('stationName') stationName: string): Promise<StationChargePrice | null> {
    return this.stationChargePriceService.getStationChargePrice(stationName);
  }
}
