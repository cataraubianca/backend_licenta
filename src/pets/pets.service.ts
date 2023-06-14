import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Pets } from './pets.entity';
import { petCategory } from './pets.entity';
import { Breed, States } from './pets.entity';
@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private petsRepository: Repository<Pets>,
    private userService: UserService
  ) {}

  async create(pet: Pets){
    return await this.petsRepository.save(pet);
  }

  async findAll(): Promise<Pets[]> {
    return await this.petsRepository.find();
  }
  async findAllRandom(): Promise<Pets[]> {
    const pets = await this.petsRepository.find();
    const shuffledPets = pets.sort(() => Math.random() - 0.5);
    return shuffledPets;
  }
  
  async findAllRandom8(): Promise<Pets[]> {
    const pets = await this.petsRepository.find();
    const shuffledPets = pets.sort(() => Math.random() - 0.5);
    const selectedPets = shuffledPets.slice(0, 8);
    return selectedPets;
  }
  

  async findAllWithDescription(description: string): Promise<Pets[]> {
    const allPets = await this.petsRepository.find();
    const filteredPets: Pets[] = [];
  
    allPets.forEach((pet) => {
      if (pet.description.includes(description)) {
        filteredPets.push(pet);
      }
    });
  
    return filteredPets;
  }
  
  async getOwnerEmailForPet(petId){
    const pet = await this.findPetById(petId)
    const ownerId = pet.userId
    const owner = await this.userService.findUserById(ownerId)
    return (await owner).email;
  }
  async findAllForUserId(userId: number): Promise<Pets[]>{
    const petsData = await this.findAll();
    const filteredPets = petsData.filter(obj =>
      (!userId || obj.userId == userId));
    return filteredPets;
    
  }

  async findFavoritesForUser(userId: number): Promise<Pets[]> {
    const favorites = await (await this.userService.findUserById(userId)).favorites;
    console.log(favorites);
  
    const uniqueFavorites = Array.from(new Set(favorites));
    let resp = [];
    for (let i in uniqueFavorites) {
      resp.push(await this.findPetById(uniqueFavorites[i]));
    }
    return resp;
  }
  

  async deletePet(id: number) {
    try {
      const pet: Pets = await this.findPetById(id);
      return this.petsRepository.remove(pet);
    } catch (err) {
      const error = `Error deleating pet with ${id}`;
      console.error(error);
    }
  }

async findPetById(id: number): Promise<Pets> {
  try {
    const user = await this.petsRepository.findOneOrFail({
      where: { id },
    });

    return user;
  } catch (err) {
    return null;
  }
}
  async getPetsByParameters(
    state: string,
    breed: string,
    petCategory: string,
    age: string,
  ): Promise<Pets[]> {
    const petsData = await this.findAll();
    const filteredPets = petsData.filter(obj =>
      (!petCategory || obj.petCategory === petCategory) &&
      (!breed || obj.breed === breed) &&
      (!state || obj.state === state) &&
      (!age || obj.age === age)
    );
    console.log(petsData);
    console.log("filtered:", filteredPets)
    return filteredPets;
  }

  private petMatchesParameters(
    pet: Pets,
    state: string,
    breed: string,
    petCategory: string,
    age: string,
  ): boolean {
    return (
      (state === null || pet.state === state) &&
      (breed === null || pet.breed === breed) &&
      (petCategory === null || pet.petCategory === petCategory) &&
      (age === null || pet.age === age)
    );
  }

  async updateName(id: number, text:string) {
    const pet = this.findPetById(id);
    (await pet).name = text
    await this.petsRepository.save(await pet);
    return pet
  }

  async updateDescription(id: number, text:string) {
    const pet = this.findPetById(id);
    (await pet).description = text
    await this.petsRepository.save(await pet);
    return pet
  }
  async updateAge(id: number, text:string) {
    const pet = this.findPetById(id);
    (await pet).age = text
    await this.petsRepository.save(await pet);
    return pet
  }
  async updateStates(id: number, state: States) {
    const pet = await this.findPetById(id);
    (await pet).state = state;
    await this.petsRepository.save(pet);
    return pet;
  }
  
  async updateTypeAndBreed(id: number, type: petCategory, breed: Breed) {
    const pet = await this.findPetById(id);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
  
    pet.petCategory = type;
    pet.breed = breed;
    await this.petsRepository.save(pet);
  
    return pet;
  }
  
  async updateImage(id: number, type: string) {
    const pet = await this.findPetById(id);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
  
    pet.image = type;
    await this.petsRepository.save(pet);
  
    return pet;
  }
}