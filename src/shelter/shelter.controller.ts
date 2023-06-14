import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { SheltersService } from './shelter.service';
import { Shelters } from './shelter.entity';
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

@Controller('shelters')
@ApiTags('shelters')
@ApiBearerAuth('docs-token')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get()
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllRoles() {
    const response = await this.sheltersService.findAll()
    return response
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async create(@Body() createRoleDto: Shelters){
    const response = await this.sheltersService.create(createRoleDto);
    return response
    }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: number, @Res() res: Response) {
    const response = await this.sheltersService.remove(id);
    return response
  }
  
}