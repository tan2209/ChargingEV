import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { CreateUserDto } from '../auth/user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {}
  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const existingUser = await this.findByPhoneNumber(createUserDto.phoneNumber);
    if (existingUser) {
      throw new BadRequestException('Số điện thoại đã tồn tại');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = new this.userModel({
      _id: new Types.ObjectId().toHexString(),
      ...createUserDto,
      password: hashedPassword,
    });

    await newUser.save();

    return true; 
  }

  async updateUser(userId: string, updateUserDto: CreateUserDto): Promise<User> {
   
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto["updateUser"], { new: true });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userModel.findOne({ phoneNumber }).lean().exec();
  }

  async updatePasswordByPhone(phone: string, newPassword: string): Promise<User> {
  
    const updatedUser = await this.userModel.findOneAndUpdate(
      { phoneNumber: phone },
      { password: newPassword }, 
      { new: true } 
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with phone number ${phone} not found`);
    }

    return updatedUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findOne({ _id: id }).lean().exec();
  }
}
