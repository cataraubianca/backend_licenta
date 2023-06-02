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
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async getAllUsers() {
    const response = await this.userService.findAll()
    return response
  }

  @Get("user/:id")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: number) {
    const response = await this.userService.findUserById(id);
    return response;
  }
  

  @Get('user-role/:userId')
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
  @Delete("id")
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Body() id: number, @Res() res: Response) {
    const response = await this.userService.remove(id);
    return response
  }
}
