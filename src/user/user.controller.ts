import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import{
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam
} from '@nestjs/swagger'
import { Public } from 'src/login/common/decorators/public.decorators';
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('docs-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllUsers() {
    const response = await this.userService.findAll()
    return response
  }
  @Put('changeName/:id/:text')
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  updateName(@Param('id') id:number, @Param('text') text: string) {
    return this.userService.updateName(id,text);
  }

  @Get("user/:id")
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: number) {
    const response = await this.userService.findUserById(id);
    return response;
  }
  

  @Get('user-role/:userId')
  @Public()
  @ApiTags('Roles')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getUserRoleById(@Param('userId') userId: number) {
    const role = await this.userService.findUsersRoleById(userId);
    if (role) return role;
    else
      throw new HttpException('No role found for user!', HttpStatus.NOT_FOUND);
  }
  @Post()
  @Public()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async create(@Body() createUserDto: User, @Res() res: Response){
    const response = await this.userService.create(createUserDto);
    return response
  }

  @Put(":id")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async update(@Param() id: number, @Body() createUserDto: User, @Res() res: Response ){
    const response = await this.userService.update(id, createUserDto);
    return response
  }

  @Put(":userId/:petId")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async addPetToUser(@Param('userId') userId: number, @Param('petId') petId: number){
    return await this.userService.addPetToUser(userId, petId);
  }

  
  @Put("favorite/:userId/:petId")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async addFavoriteToUser(@Param('userId') userId: number, @Param('petId') petId: number){
    return await this.userService.addFavoriteToUser(userId, petId);
  }

  @Put("removeFavorite/:userId/:petId")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async removeFromFavorites(@Param('userId') userId: number, @Param('petId') petId: number){
    return await this.userService.removeFromFavorites(userId, petId);
  }
  @Delete(":id")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: number, @Res() res: Response) {
    const response = await this.userService.remove(id);
    return response
  }
}
