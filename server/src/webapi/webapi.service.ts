import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User } from 'src/users/user.model';
import { ChargingStation } from 'src/pulldataset/charging-station.model';
import { ChargingTest } from 'src/chargingstation/chargingstation.model';
import { Order } from 'src/orders/orders.model';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { identity } from 'rxjs';

@Injectable()
export class WebApiService {
  constructor(
    @InjectModel(User) private readonly chargingUserModel: ModelType<User>,
    @InjectModel(ChargingStation) private readonly chargingStationModel: ModelType<ChargingStation>,
    @InjectModel(ChargingTest) private readonly chargingStationModelTest: ModelType<ChargingTest>,
    @InjectModel(Order) private readonly chargingOrder: ModelType<Order>,
  ) {}
  async fetchUser(phone: string,role:string): Promise<any[]> {  
    try {
      const chargingAdmin = await this.chargingUserModel.findOne({phoneNumber: phone, role:"management"}).exec();
      if(!chargingAdmin) return null;
      const user = await this.chargingUserModel.find({role:role,userBrand:chargingAdmin.userBrand})
      return user;
    } catch (error) {
      throw new Error('Failed to get data');
    } 
  }
  async fetchHistoryByUserID(userId: string): Promise<any[]> {  
    try {
      const user = await this.chargingOrder.find({userId:userId})
      return user;
    } catch (error) {
      throw new Error('Failed to get data');
    } 
  }
  async deleteUser(userId: string): Promise<string> {  
    try {
      const user = await this.chargingUserModel.findByIdAndDelete({_id:userId})
      return "true";
    } catch (error) {
      throw new Error('Failed to get data');
    } 
  }
  async deleteStation(id: string): Promise<string> {  
    try {
      const station = await this.chargingStationModelTest.findByIdAndDelete({_id: id})
      return "true";
    } catch (error) {
      throw new Error('Failed to get data');
    } 
  }
  async fetchHistoryByStationName(stationName: string): Promise<any[]> {
    try {
      const orders = await this.chargingOrder.find({ stationName }).exec();

      const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
          const user = await this.chargingUserModel.findById(order.userId).exec();
          return {
            ...order.toObject(),
            userDetails: {
              phoneNumber: user.phoneNumber,
            },
          };
        }),
      );
      
      return enrichedOrders;
    } catch (error) {
      throw new Error('Failed to get data');
    }
  }
  async fetchChargingStation(phone: string): Promise<any[]> {  
    try {
      
      const chargingAdmin = await this.chargingUserModel.findOne({phoneNumber: phone, role:"management"}).exec();
      if(!chargingAdmin) return null;
      let results;
      if(chargingAdmin.userBrand == "VietEV"){
        results = await this.chargingStationModelTest.find().exec();
      }else{
        const regex = new RegExp(chargingAdmin.userBrand, 'i');
         results = await this.chargingStationModel.find({ 'properties.stationName': regex }).exec();
      }
      
      return results;
    } catch (error) {
      throw new Error('Failed to get data');
    }
}
async createNewUser(createUserDto: any): Promise<{ message: string; }> {
  if (!createUserDto.password) {
    throw new BadRequestException('Password is required');
  }

 
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

  
  const newUser = new this.chargingUserModel({
    ...createUserDto,
    password: hashedPassword, 
  });

  await newUser.save();

  
  return { message: 'User created successfully', };
}

async createChargingStation(phone: string, createChargingStationDto: any): Promise<ChargingStation> {
  const chargingAdmin = await this.chargingUserModel.findOne({ phoneNumber: phone, role: "management" }).exec();
  let newChargingStation;
  if (chargingAdmin.userBrand === "VietEV") {
    newChargingStation = new this.chargingStationModelTest(createChargingStationDto);
  } else {
    newChargingStation = new this.chargingStationModel(createChargingStationDto);
  }
    return await newChargingStation.save(); 
}


async loginUser (phoneNumber: string, password: string) : Promise<any> {
  const user = await this.chargingUserModel.findOne({ phoneNumber }).lean().exec();
  if (!user) {
    return null;
}
if (!user.password) {
  throw new Error("Password is missing for the user");
}
   const hashedPassword = await bcrypt.compare( password, user.password);
  if (user && hashedPassword&& user.role == 'management') {
    return user;
  }
  return null;
}

async fetchChargingStationById(id: string): Promise<any> {  
  try {
    const station = await this.chargingStationModelTest.findOne({_id: id}).lean().exec()
    return station;
  } catch (error) {
    throw new Error('Failed to get data');
  } 
}

}

  
 