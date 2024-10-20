
import { prop, getModelForClass } from '@typegoose/typegoose';

export class StationChargePrice {
  @prop({ required: true, unique: true })
  stationName!: string;

  @prop({ required: true })
  pricePerKwh!: number;
  
  @prop({ required: true })
  Wattage!: number;
 
}

