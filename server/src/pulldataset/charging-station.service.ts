import { Injectable } from '@nestjs/common';
import { ChargingStation } from './charging-station.model';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ChargingStationService {
  constructor(
    @InjectModel(ChargingStation) private readonly chargingStationModel: ModelType<ChargingStation>,
  ) {}

  async findNearest(lat: number, lng: number, maxDistance: number): Promise<ChargingStation[]> {
    try {
      const results = await this.chargingStationModel.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            distanceField: 'dist.calculated',
            maxDistance: maxDistance,
            spherical: true,
          },
        },
        {
          $limit: 20 
        }
      ]).exec();
      
      return results;
    } catch (error) {
      console.error('Error finding nearest charging stations:', error);
      throw error;
    }
  }
  

  async findByAddress(address: string): Promise<ChargingStation[]> {
    try {
      const regex = new RegExp(address, 'i'); 
      const results = await this.chargingStationModel.find({ 'properties.address' : regex }).exec();
     return results
    } catch (error) {
      console.error('Error finding charging stations by address:', error);
      throw error;
    }
  }

  async findByStationName(stationName: string, lat: number, lng: number, maxDistance: number): Promise<ChargingStation[]> {
    try {
      const results = await this.chargingStationModel.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            distanceField: 'dist.calculated',
            maxDistance: maxDistance,
            spherical: true,
            query: {
              'properties.stationName': { $regex: stationName, $options: 'i' }, 
            },
          },
        },
        {
          $limit: 20 
        }
      ]).exec();
      
      return results;
    } catch (error) {
      console.error('Error finding nearest charging stations:', error);
      throw error;
    }
  }

  async findAll(): Promise<ChargingStation[]> {
    try {
      const results = await this.chargingStationModel.find().limit(60).exec();
      return results;
    } catch (error) {
      console.error('Error retrieving all charging stations:', error);
      throw error;
    }
  }
  
  
}
