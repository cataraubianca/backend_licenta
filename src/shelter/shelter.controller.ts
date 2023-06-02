import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
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
}