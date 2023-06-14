import { Body, Controller, Delete, Get, Param, Post, Put, Res, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Breed, petCategory, Pets, States } from './pets.entity';
import { Public } from 'src/login/common/decorators/public.decorators';
import { Roles } from 'src/login/common/decorators/roles.decorator';
import { UserRole } from 'src/roles/roles.entity';

import{
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam
} from '@nestjs/swagger'

@Controller('pets')
@ApiTags('pets')
@ApiBearerAuth('docs-token')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllPets() {
    const response = await this.petsService.findAll()
    return response
  }

  
  @Get('random')
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllPetsRandom() {
    const response = await this.petsService.findAllRandom()
    return response
  }

  @Get('random8')
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllPetsRandom8() {
    const response = await this.petsService.findAllRandom8()
    return response
  }

  @Get('favorite/:userId')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getFavorites(@Param('userId') userId: number){
    return await this.petsService.findFavoritesForUser(userId)
  }
  @Get('advanced')
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getPets(
    @Query('state') state: string,
    @Query('breed') breed: string,
    @Query('petCategory') petCategory: string,
    @Query('age') age: string,
  ): Promise<Pets[]> {
    return await this.petsService.getPetsByParameters(state, breed, petCategory, age);
  }

  @Get('findAllForUserId/:userId')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findAllForUserId(
    @Param('userId') userId: number,
  ): Promise<Pets[]> {
    return await this.petsService.findAllForUserId(userId);
  }

  @Get('ownerEmail/:petId')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getOwnerEmailForPet(@Param('petId') petId: number){
    return await this.petsService.getOwnerEmailForPet(petId);
  }

  @Get('description/:text')
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findAllWithDescription(@Param('text') text: string){
    return await this.petsService.findAllWithDescription(text);
  }

  @Get("pet/:id")
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: number) {
    const response = await this.petsService.findPetById(id);
    return response;
  }
  @Post()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async create(@Body() createRoleDto: Pets){
    const response = await this.petsService.create(createRoleDto);
    return response
    }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  deleteTeamById(@Param('id') id: number) {
    const team = this.petsService.findPetById(id);

    if (!team)
      throw new HttpException(
        `Team with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    const deleted = this.petsService.deletePet(id);

    if (!deleted)
      throw new HttpException(
        `Error deleting team with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return deleted;
  }

  @Put('changeName/:id/:text')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  updateName(@Param('id') id:number, @Param('text') text: string) {
    return this.petsService.updateName(id,text);
  }
  @Put('changeDescription/:id/:text')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  updateDescription(@Param('id') id:number, @Param('text') text: string) {
    return this.petsService.updateDescription(id,text);
  }
  @Put('changeAge/:id/:text')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  updateAge(@Param('id') id:number, @Param('text') text: string) {
    return this.petsService.updateAge(id,text);
  }
  @Put('changeLocation/:id')
@ApiOkResponse()
@ApiNotFoundResponse()
updateLocation(@Param('id') id: number, @Query('state') state: States) {
  return this.petsService.updateStates(id, state);
}

@Put('changeTypeAndBreed/:id')
@ApiOkResponse()
@ApiNotFoundResponse()
updateTypeAndBreed(
  @Param('id') id: number,
  @Query('type') type: petCategory,
  @Query('breed') breed: Breed
) {
  return this.petsService.updateTypeAndBreed(id, type, breed);
}

@Put('updateImage/:id')
@ApiOkResponse()
@ApiNotFoundResponse()
updateImage(
  @Param('id') id: number,
  @Body('image') type: string,
) {
  return this.petsService.updateImage(id, type);
}

}