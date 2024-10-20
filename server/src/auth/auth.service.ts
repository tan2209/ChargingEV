
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findByPhoneNumber(phone);
    if (!user) {
      return null;
  }
  if (!user.password) {
    throw new Error("Password is missing for the user");
}
     const hashedPassword = await bcrypt.compare( pass, user.password);
    if (user && hashedPassword) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { phoneNumber: user.phoneNumber, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      success: true,
      access_token: accessToken,
      user: user, 
    };
  }

  

  async register(createUserDto: CreateUserDto): Promise<{ success: boolean; message?: string }> {
    try {
      await this.usersService.create(createUserDto);
      return { success: true }; 
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { success: false, message: error.message }; 
      }
      throw error; 
    }

  }
  async updateUser(userId: string, updateUserDto: any) {
    try {
      
      const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
      return { success: true, user: updatedUser };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { success: false, message: error.message };
      }
      throw error;
    }
  }

  async getUser(userId: string) {
    try {
      const updatedUser = await this.usersService.getUserById(userId);
      return { success: true, user: updatedUser };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { success: false, message: error.message };
      }
      throw error;
    }
  }

  async checkPhoneNumber(phone: string) {
    const user = await this.usersService.findByPhoneNumber(phone);
    if (user) {
      return true;
  } 
  return false
}

async updatePassword(phone: string, newPass: string) {
  const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
 
  const updatedUser = await this.usersService.updatePasswordByPhone(phone, hashedPassword);
  if (!updatedUser) {
      throw new NotFoundException(`User with ID ${phone} not found`);
  }
  return { success: true, user: updatedUser };
}
}
