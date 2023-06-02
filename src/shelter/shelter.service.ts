import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shelters } from './shelter.entity';

@Injectable()
export class SheltersService {
  constructor(
    @InjectRepository(Shelters)
    private sheltersRepository: Repository<Shelters>,
  ) {}

  async findAll(): Promise<Shelters[]> {
    return await this.sheltersRepository.find();
  }

  async create(shelter: Shelters){
    return await this.sheltersRepository.save(shelter);
  }
}