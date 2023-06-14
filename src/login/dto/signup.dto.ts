import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class SignupDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the new user',
    type: 'string',
    example: 'abc@yahoo.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The password of the new user',
    type: 'string',
    example: 'abc@yahoo.com',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The full name of the new user',
    type: 'string',
    example: 'John Doe',
  })
  full_name: string;
}