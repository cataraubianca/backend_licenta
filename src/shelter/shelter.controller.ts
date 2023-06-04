import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { SheltersService } from './shelter.service';
import { Shelters } from './shelter.entity';
import{
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam
} from '@nestjs/swagger'

@Controller('shelters')
@ApiTags('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllRoles() {
    const response = await this.sheltersService.findAll()
    return response
  }

  @Post()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async create(@Body() createRoleDto: Shelters){
    const response = await this.sheltersService.create(createRoleDto);
    return response
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiNotFoundResponse()
    deleteTeamById(@Param('id') id: number) {
      const team = this.sheltersService.findPetById(id);
  
      if (!team)
        throw new HttpException(
          `Team with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
  
      const deleted = this.sheltersService.deletePet(id);
  
      if (!deleted)
        throw new HttpException(
          `Error deleting team with id ${id}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
  
      return deleted;
    }
  
}