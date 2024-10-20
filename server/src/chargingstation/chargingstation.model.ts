import { prop, getModelForClass, index, modelOptions, Severity } from '@typegoose/typegoose';

@index({ placeId: 1 })
@index({ "properties.stationName": 1 })
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Geometry {
  @prop({ required: true })
  public type!: string;

  @prop({ required: true, type: () => [Number] })
  public coordinates!: number[];
}

export class Properties {
  @prop({ required: true })
  public bussinessStatus!: string;

  @prop({ required: true, default: 5 })  // Giá trị mặc định cho rating
  public rating!: number;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public stationName!: string;

  @prop({ required: true })
  public totalChargingPorts!: number;

  @prop({ required: true, default: false }) 
  public status!: boolean;

  @prop({ required: true })
  public openingHours!: string;
}

export class ChargingTest {
  @prop()
  public placeId!: string;

  @prop({ required: true })
  public type!: string;

  @prop({ required: true, _id: false })
  public geometry!: Geometry;

  @prop({ required: true, _id: false })
  public properties!: Properties;
}
