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

  async deletePet(id: number) {
    try {
      const pet: Shelters = await this.findPetById(id);
      return this.sheltersRepository.remove(pet);
    } catch (err) {
      const error = `Error deleating pet with ${id}`;
      console.error(error);
    }
  }

async findPetById(id: number): Promise<Shelters> {
  try {
    const user = await this.sheltersRepository.findOneOrFail({
      where: { id },
    });

    return user;
  } catch (err) {
    return null;
  }
}
}