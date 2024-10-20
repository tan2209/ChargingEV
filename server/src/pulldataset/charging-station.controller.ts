import { Controller, Get, Query } from '@nestjs/common';
import { ChargingStationService } from './charging-station.service'
import { ChargingStation } from './charging-station.model';

@Controller('charging-stations')
export class ChargingStationController {
  constructor(private readonly chargingStationService: ChargingStationService) {}

  @Get('nearest')
  async getNearest(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('maxDistance') maxDistance: string,
  ): Promise<ChargingStation[]> {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const distance = parseInt(maxDistance, 10);

    return this.chargingStationService.findNearest(latitude, longitude, distance);
  }

  @Get('by-address')
  async getByAddress(@Query('address') address: string): Promise<ChargingStation[]> {
    return this.chargingStationService.findByAddress(address);
  }
  @Get('by-stationName')
  async getByCarBrand(
    @Query('stationName') stationName: string,
    @Query('lat') lat: string,
    @Query('long') long: string,
    @Query('maxDistance') maxDistance: number,
  ): Promise<ChargingStation[]> {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    return this.chargingStationService.findByStationName(stationName, latitude, longitude, 50000);
  }

  @Get()
  async findAll(): Promise<ChargingStation[]> {
    return this.chargingStationService.findAll();
  }
}
