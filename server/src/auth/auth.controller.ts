import { Controller, Post, Body, Put, Param, Patch, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.phoneNumber, loginDto.password);
    if (!user) {
      return { success: false,  message: 'Invalid credentials' };
    }
    return this.authService.login(user);
    
  }

  @Post('register')
  async register(@Body() createUserDto: any) {
    return this.authService.register(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto : CreateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }

  @Post('checkphone')
  async checkPhoneNumber(@Body('phone') phone: string) {
      try {
          return await this.authService.checkPhoneNumber(phone); 
      } catch (error) {
          console.error('Error in checkPhoneNumber:', error);
          throw error; 
      }
  }

  @Patch('changePassword')
    async updatePassword(@Body('newPass') newPass: string,@Body('phone') phone: string) {
        return this.authService.updatePassword(phone, newPass);
    }
}


