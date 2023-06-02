import {
    ForbiddenException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
  
  import { GetCurrentUser, Public } from './common/decorators';
  import { LoginDto, SignupDto } from './dto';
  import { LoginService } from './login.service';
  import { Tokens } from './types';
  
  @Controller('auth')
  @ApiTags('Auth')
  @ApiBearerAuth('docs-token')
  export class LoginController {
    constructor(private loginService: LoginService) {}
  
    @Public()
    @Post('new')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.CONFLICT)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiOkResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse()
    async signupLocal(@Body() formFields: User): Promise<Tokens> {
      return this.loginService.signupLocal(formFields);
    }
  
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.FORBIDDEN)
    @ApiOkResponse()
    @ApiForbiddenResponse()
    async signinLocal(
      @Body() formFields: LoginDto,
      @Res({ passthrough: true }) res,
    ): Promise<Tokens> {
      const login = await this.loginService.signinLocal(formFields, res);
      if (login) {
        return login;
      } else {
        throw new ForbiddenException(
          `Email and password combination don't match any existing user.`,
        );
      }
    }
  
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    async logout(@GetCurrentUser('id') userId: number, @Req() req, @Res() res) {
      return this.loginService.logout(userId, req, res);
    }
  }