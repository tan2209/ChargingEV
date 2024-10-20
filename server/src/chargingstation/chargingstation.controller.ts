import { Controller, Post, Body, Get, Param, Query, Patch } from '@nestjs/common';
import { ChargingStationTestService } from './chargingstation.service';

@Controller('charging-test')
export class ChargingStationTestController {
  constructor(private readonly chargingStationService: ChargingStationTestService) {}

  @Get('fetch_data_test')
  async fetchData(): Promise<any[]> {
    try {
      const data = await this.chargingStationService.fetchDataTest();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }

  @Get('/:stationName')
  async getStatus(@Param('stationName') stationName: string): Promise<{ status: boolean }> {
    const status = await this.chargingStationService.findStatusByStationName(stationName);
    return { status };
  }

  @Patch('update/:stationName')
  async updateStatus(
    @Param('stationName') stationName: string,
    @Body('status') status: boolean
  ): Promise<any[]> {
    return this.chargingStationService.updateStatus(stationName, status);
  }
  @Patch(':id')
  async updateChargingStation(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<any> {
    return this.chargingStationService.updateChargingStation(id, updateData);
  }
}