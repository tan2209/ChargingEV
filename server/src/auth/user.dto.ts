import { IsString, IsNotEmpty, Length, MinLength, MaxLength, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  phoneNumber: string;
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  address?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  carBrand?: string;
  
}