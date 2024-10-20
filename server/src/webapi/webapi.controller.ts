import { Controller, Post, Body, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import {  WebApiService } from './webapi.service';
import { AuthService } from 'src/auth/auth.service';
import { constrainedMemory } from 'process';
import { databaseConfig } from 'src/shared/config/database.config';

@Controller('webapi')
export class WebApiController {
  constructor(private readonly chargingStationService: WebApiService,
    private readonly authService: AuthService
  ) {}

  @Get('fetch_user')
  async fetchData(@Query() info: any): Promise<any[]> {
    try {
      const data = await this.chargingStationService.fetchUser(info.phoneNumber,info.role);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
  @Get('fetch_charging_station')
  async fetchChargingStation(@Query() info: any): Promise<any[]> {
    const { phone } = info
    try { 
      const data = await this.chargingStationService.fetchChargingStation(phone);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
}

@Get('fetch_charging_station_byId/:id')
  async fetchChargingStationById(@Param() station: any): Promise<any[]> {
    try { 
      
      const data = await this.chargingStationService.fetchChargingStationById(station.id);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }

}
@Get('fetch_detail_user')
async fetchDetailUser(@Query() info: any): Promise<any[]> {
  try {
    const data = await this.chargingStationService.fetchHistoryByUserID(info.userId);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
@Get('fetch_detail_station')
async fetchDetailStation(@Query() info: any): Promise<any[]> {
  const { stationName } = info
  try {
    const data = await this.chargingStationService.fetchHistoryByStationName(stationName);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

@Delete('/users/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.chargingStationService.deleteUser(id);
  }

@Delete('/delete_station/:id')
async deleteStation(@Param('id') id: string): Promise<void> {
  try {
    await this.chargingStationService.deleteStation(id);
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

@Post('createUser')
async addUser(@Body() createUserDto: any): Promise<{ message: string }> {
  const createUser  =  createUserDto.newUser 
  const newUser = await this.chargingStationService.createNewUser(createUser);
  return { message: 'User created successfully' }; 
}

@Post('createStation')
async addChargingStation(
  @Body() createChargingStationDto: any,
  @Body() phone: any
): Promise<{ message: string }> { 
  
  const createStation = createChargingStationDto.newStation  
  const phoneNumber = phone.phone
  await this.chargingStationService.createChargingStation(phoneNumber,createStation);

  return { message: 'Charging station created successfully' }; 
}

@Post('login')
  async login(@Body() loginDto: any) {
    const login = loginDto.newUser;
    const user = await this.chargingStationService.loginUser(login.phoneNumber, login.password);    return user
    
  }
}
