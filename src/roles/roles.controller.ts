import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { Public } from 'src/login/common/decorators/public.decorators';

import{
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam
} from '@nestjs/swagger'

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth('docs-token')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllRoles() {
    const response = await this.rolesService.findAll()
    return response
  }

  @Post()
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async create(@Body() createRoleDto: Roles){
    const response = await this.rolesService.create(createRoleDto);
    return response
    }
}