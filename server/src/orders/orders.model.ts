import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Order {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public stationName!: string;

  @prop()
  public location!: string;

  @prop({ required: true })
  public chargeDate!: Date;

  @prop({ required: true })
  public totalChargeTime!: number;

  @prop({ required: true })
  public paymentStatus!: string;

  @prop({ required: true })
  public price!: number;
  
  @prop({ required: true })
  pricePerKwh!: number;
}