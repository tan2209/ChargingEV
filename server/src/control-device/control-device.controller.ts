import { Controller, Post, Body, Logger, Get, Param,Res } from "@nestjs/common";
import { ControlDeviceService } from "./control-device.service";
import { Response } from 'express';
import { sign } from "crypto";

@Controller('control-device')
export class ControlDevicenController {
    constructor(private readonly controldeviceService:ControlDeviceService
        
     ) {}

    // @Post()
    // async controlDevice (@Res() res ,@Body('status') status: string, @Body('phoneNumber') phone: string,@Body('time') time: string, @Body('aboutTime') aboutTime: number) {
    //     return this.controldeviceService.controlDevice(res, status,phone,time,aboutTime)
    // }
    // @Post('booking')
    // async booking (@Body('phoneNumber') phoneNumber: string, @Body('stationName') stationName: string,@Body('slot') slot: number) {
    //     return this.controldeviceService.insertBooking(phoneNumber,stationName,slot)
    // }
    @Post('status')
    async verifiableCode (@Body() status: string) {
        return this.controldeviceService.processStatus(status);
    }
    @Post('verifiableCode')
    async handleVerifiableCode(@Body() verifiableCode: string) {
      try {
        return await this.controldeviceService.processVerifiableCode(verifiableCode);
      } catch (error) {
        // Xử lý lỗi nếu có
        throw new Error('Failed to process verifiable code');
      }
    }
    onModuleInit() {
        this.controldeviceService.connect();
        // Subscribe vào topic
        // console.log(this.controldeviceService.subscribe('testtopic/sentData'))
        // this.controldeviceService.subscribe('testtopic/sentData')
        
      
      }
    
}