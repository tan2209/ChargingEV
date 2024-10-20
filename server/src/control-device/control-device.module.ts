import { Module } from '@nestjs/common';

import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ControlDevicenController } from './control-device.controller';
import { ControlDeviceService } from './control-device.service';
import { Booking } from './control-device.model';



@Module({
  imports: [TypegooseModule.forFeature([Booking])],
  controllers: [ControlDevicenController],
  providers: [ControlDeviceService]
})
export class ControlDeviceModule {}