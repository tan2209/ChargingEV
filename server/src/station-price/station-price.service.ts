import { Injectable } from '@nestjs/common';

import { ReturnModelType } from '@typegoose/typegoose';
import { StationChargePrice } from './station-price.model';
import { InjectModel } from '@m8a/nestjs-typegoose';

@Injectable()
export class StationChargePriceService {
  constructor(
    @InjectModel(StationChargePrice)
    private readonly stationChargePriceModel: ReturnModelType<typeof StationChargePrice>,
  ) {}

  async createOrUpdateStationChargePrice(stationName: string, pricePerKwh: number, Wattage: number): Promise<StationChargePrice> {
    let stationPrice = await this.stationChargePriceModel.findOne({ stationName }).exec();
    if (!stationPrice) {
      stationPrice = new this.stationChargePriceModel({ stationName, pricePerKwh, Wattage });
    } else {
      stationPrice.pricePerKwh = pricePerKwh;
    }
    return stationPrice.save();
  }

  async getStationChargePrice(stationName: string): Promise<StationChargePrice | null> {
    return this.stationChargePriceModel.findOne({ stationName }).exec();
  }
}
