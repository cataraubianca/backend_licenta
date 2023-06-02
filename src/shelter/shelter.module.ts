import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelters } from './shelter.entity';
import { SheltersService } from './shelter.service';
import { SheltersController } from './shelter.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Shelters])],
  controllers: [SheltersController],
  providers: [SheltersService]
})
export class SheltersModule {}