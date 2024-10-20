import {Injectable, Res, BadRequestException, Logger} from '@nestjs/common'
// import { Response } from 'express';
// import { Booking } from './control-device.model';
// import { InjectModel } from '@m8a/nestjs-typegoose';
// import { Model } from 'mongoose';
// import { ChargingStation } from 'src/manage-charging/charging-station.model';
// import { Payment } from 'src/payment/payment.model';
import * as mqtt from 'mqtt'


@Injectable()
export class ControlDeviceService {
  private code: string
  private mqttClient: mqtt.MqttClient;
  connect() {
    this.mqttClient = mqtt.connect('mqtt://broker.emqx.io:1883', {
      clientId: "ngan1234", rejectUnauthorized: false, clean: true, username:"admin",password:"public"
    });
    this.mqttClient.on('error', (e) => {
    });

    this.mqttClient.on('connect', () => {
    });
  }
 async generateRandomSixDigitNumber(){
  return Math.floor(100000 + Math.random() * 900000)
}
async subscribe(topic: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Subscribe to the topic
    this.mqttClient.subscribe(topic, { qos: 0 }, (err) => {
      if (err) {
        return reject('Failed to subscribe: ' + err);
      }
      console.log(`Subscribed to topic: ${topic}`);
    });

    // Listen for messages on the subscribed topic
    this.mqttClient.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        resolve(message.toString()); // Return the message as a string
      }
    });

    this.mqttClient.on('error', (err) => {
      reject('Error receiving message: ' + err);
    });
  });
}
  publish(topic: string, message: string) {
    this.mqttClient.publish(topic, message, { qos: 0 }, (error) => {
      if (error) {
        console.error('Failed to publish message:', error);
      } else {
        console.log(`Message published to topic ${topic}: ${message}`);
      }
    });
  }
  Substring(hex: string, a: number, x: number) {
    return [a + x, hex.substring(a * 2, (a + x) * 2)]
  }
    
  async processVerifiableCode(verifiableCode: string){

    try {
      const number =   await verifiableCode['stationName'].slice(-1)
      if(verifiableCode['code']==this.code)  {
        const currentTime = new Date()
        this.publish('testtopic/publichStatus',`box${number}|relayOn|${currentTime}`)
        this.publish('testtopic/screen',`box${number}|screen2@`)
        // const dataCharging = this.subscribe("testtopic/sentData");
        // console.log(`box${number}: ${dataCharging}`);
        return {
          success: true,
          currentTime: currentTime,
        };
      } 
      return {
        success: false,
        currentTime: null,
      };
    } catch (error) {
      throw new Error('Failed to process verifiable code');
    }
  }
  async processStatus(verifiableCode: string){
 

    try {
     
      const number =  await verifiableCode['status'].slice(-1); 
      console.log(verifiableCode)
      console.log(number)
      if(verifiableCode['status']==`sent${number}`){
        this.publish('testtopic/screen',`box${number}|screen1@`)
        this.code= (await this.generateRandomSixDigitNumber()).toString()
        this.publish('testtopic/subOTP',`box${number}|OTP${this.code}@`)
      } 
      if(verifiableCode['status']==`off${number}`)  {
      this.publish('testtopic/screen',`box${number}|screen3@`)
      this.publish('testtopic/publichStatus',`box${number}|relayOff`)
      }
    } catch (error) {
      throw new Error('Failed to process sent code');
    }
  }

  // async processVerifiableCode(verifiableCode: string){
  //   console.log(this.code)
  //   console.log(verifiableCode)
  //   try {
  //     if(verifiableCode['code']==this.code)  {
       
  //       console.log('true')
  //       this.publish('testtopic/publichStatus','relayOn')
  //       return true
  //     }
  //     this.publish('testtopic/publichStatus','relayOff')
  //     console.log('false')
  //     return false;
    
  //   } catch (error) {
  //     throw new Error('Failed to process verifiable code');
  //   }
  // }
    // constructor( @InjectModel(Booking) private readonly bookingModel : Model<Booking>,
    // @InjectModel(ChargingStation) private readonly chargingModel : Model<ChargingStation>,
    // @InjectModel(Payment) private readonly paymentModel : Model<Payment>,
    // ) {}

    // async controlDevice(@Res() res: Response,status : string,phone: string,time: string,aboutTime: number) {
    //         const booking =await this.bookingModel.findOne({phoneNumber:phone})
    //         const slot=booking.slot
    //         let newBooking: any = {};
    //         if (status === 'off') {
    //             res.redirect(307, `http://192.168.27.174/off${slot}`);
    //             newBooking.status='Done'
    //             newBooking.timeOut=time
    //             newBooking.aboutTime=aboutTime
    //             let payment = await this.paymentModel.findOneAndUpdate(
    //               { phoneNumber: phone },
    //               { $inc: { totalTime: aboutTime } },
    //               { upsert: true, new: true }
    //             );
    //             const updatedChargingStation = await this.chargingModel.findOneAndUpdate({stationName: booking.stationName},{$pull:{bookedPosition: slot}}, {new: true})
    //             await this.chargingModel.findOneAndUpdate({stationName: booking?.stationName}, {$set: { filledSlots: updatedChargingStation.bookedPosition.length}})
    //           } else if (status === 'on') {
    //             res.redirect(307, `http://192.168.27.174/on${slot}`);
    //             newBooking.status='Active'
    //             newBooking.timeIn=time
    //           } else {
    //             res.status(400).send('Invalid signal.');
    //           }
    //           await this.bookingModel.findOneAndUpdate(
    //             { phoneNumber: phone},
    //             {
    //               $set: newBooking,
    //             },
    //             {
    //               new: true,
    //               upsert: true,
    //             },
    //           );     
    // }
    // async insertBooking(phoneNumber: string, stationName: string, slot: number){
    //     try {
    //         let newBooking: any = {};
    //         newBooking.phoneNumber = phoneNumber;
    //         newBooking.stationName = stationName;
    //         newBooking.slot = slot
    //         if(!newBooking.status){
    //             newBooking.status='Booking'
    //         }
    //         await this.bookingModel.findOneAndUpdate(
    //           { phoneNumber: newBooking.phoneNumber},
    //           {
    //             $set: newBooking,
    //           },
    //           {
    //             new: true,
    //             upsert: true,
    //           },
    //         );
            
    //         const updatedChargingStation = await this.chargingModel.findOneAndUpdate(
    //           { stationName: stationName },
    //           {
    //             $addToSet: { bookedPosition: slot },
    //           },
    //           { new: true, upsert: true }
    //         );
    //         const updatedFilledSlots = await this.chargingModel.findOneAndUpdate(
    //           {stationName: stationName},
    //           {
    //             $set: { filledSlots: updatedChargingStation.bookedPosition.length}
    //           },
    //           {upsert: true}
    //         )
          
    //       } catch (error) {
    //         Logger.error(error);
    //         return;
    //       }
    // }


}
