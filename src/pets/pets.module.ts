import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './pets.entity';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pets]), UsersModule],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}