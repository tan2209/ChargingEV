import { Injectable, NotFoundException } from '@nestjs/common';
import { ChargingTest } from './chargingstation.model';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';


@Injectable()
export class ChargingStationTestService {
  constructor(
    @InjectModel(ChargingTest) private readonly chargingStationModel: ModelType<ChargingTest>,
  ) {}

  public async fetchDataTest(): Promise<any[]> {
    try {
      const chargingTest = await this.chargingStationModel.find().exec();
      return chargingTest;
    } catch (error) {
      throw new Error('Failed to get data');
    }
  }

  async findStatusByStationName(stationName: string): Promise<boolean> {
    const station = await this.chargingStationModel.findOne({ "properties.stationName": stationName }).exec();
    
    if (!station) {
      throw new NotFoundException('Station not found');
    }
    return station.properties.status;
  }
  

  async updateStatus(stationName: string, status: boolean): Promise<any> {
    const station = await this.chargingStationModel.findOneAndUpdate(
      { "properties.stationName": stationName },
      { "properties.status": status },
      { new: true }
    ).exec();
  
    if (!station) {
      throw new NotFoundException('Station not found');
    }
  
    return station;
  }
  
  async updateChargingStation(id: string, updateData: any): Promise<any> {
    const updatedStation = await this.chargingStationModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedStation) {
      throw new NotFoundException(`Charging station with id ${id} not found`);
    }
    return updatedStation;
  }
  
  }

