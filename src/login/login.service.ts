import {
    HttpStatus,
    Injectable,
    // UseGuards,
    Inject,
    HttpException,
    Res,
    Req,
    Logger,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { Repository } from 'typeorm';
  
  import { Tokens } from './types';
  import { LoginDto, SignupDto } from './dto';
  // import { AuthGuard } from '@nestjs/passport';
  
  import { User } from 'src/user/entity/user.entity';
  import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/roles/roles.entity';

  
  @Injectable()
  export class LoginService {
    constructor(
      private jwtService: JwtService,
      @InjectRepository(User)
      @InjectRepository(Roles)
      private usersRepository: Repository<User>,
      private userService: UserService,
      private readonly logger: Logger,
    ) {}
  
    /**
     * Register new user
     * @param dto Login object containing email and password
     * @returns auth token
     */
    async signupLocal(formFields: User): Promise<Tokens> {
      const { email, password, full_name } = formFields;
  
      const newUser = await this.userService.insertUser(
        formFields
      );
  
      console.log(await newUser.id)
      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.UpdateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    }
  
    /**
     * Sign-in existing user
     * @param dto email and password strings
     * @param res http response
     * @returns auth token
     */
    async signinLocal(
      dto: LoginDto, res,
    ): Promise<Tokens> {
      const { email, password } = dto;
      try {
        const user = await this.userService.findUserByEmail(email);
        if (user) {
          const passInDb = user.password;
          const check = await bcrypt.compare(password, passInDb);
          if (check) {
            const tokens = await this.getTokens(user.id, user.email);
            res.cookie('accessCookie', tokens, {
              sameSite: 'strict',
              httpOnly: true,
            });
            return tokens;
          } else {
            return null
          }
        } else {
          return null
        }
      } catch (err) {
        const error = `Login error for user: ${dto.email}`;
        this.logger.warn(error);
        console.warn(error);
      }
    }
  
    /**
     * Logout user by id
     * @param userId the id of the user
     * @param req request object
     * @param res response object
     * @returns true if logout issuccessful
     */
    async logout(userId: number, @Req() req, @Res() res): Promise<boolean> {
      const user = await this.userService.findUserById(userId);
  
      if (user) {
        res.clearCookie('accessCookie', { path: '/' });
        res.redirect('/');
        return true;
      } else return false;
    }
  
    async UpdateRtHash(userId: number, rt: string) {
      const hash = await this.hashData(rt);
      const user = await this.usersRepository.findOneOrFail({
        where: {
          id: userId,
        },
      });
  
      if (user) {
        user.salt = hash;
        return this.usersRepository.save(user);
      } else throw new HttpException('User not found', 404);
    }
  
    //encrypting function
    hashData(data: string) {
      return bcrypt.hash(data, 10);
    }
  
    async getTokens(userId: number, email: string): Promise<Tokens> {
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(
          {
            id: userId,
            email,
          },
          {
            secret: 'at-secret',
            expiresIn: 60 * 60,
          },
        ),
        this.jwtService.signAsync(
          {
            id: userId,
            email,
          },
          {
            secret: 'rt-secret',
            expiresIn: 60 * 60 * 24 * 7,
          },
        ),
      ]);
      return {
        access_token: at,
        refresh_token: rt,
      };
    }
  }
  
  class LoginErrorException extends HttpException {
    constructor() {
      super(
        `Email and password combination don't match any existing user.`,
        HttpStatus.FORBIDDEN
      );
    }
  }