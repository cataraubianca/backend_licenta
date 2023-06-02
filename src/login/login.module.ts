import { Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from 'src/user/user.controller';
import { UsersModule } from 'src/user/user.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserService } from 'src/user/user.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AtStrategy, RtStrategy } from './strategies';
import { RolesService } from 'src/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Roles } from 'src/roles/roles.entity';


@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    RolesModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Roles])
  ],
  controllers: [LoginController, UserController],
  providers: [
    LoginService,
    RtStrategy,
    AtStrategy,
    UserService,
    Logger,
  ],
})
export class LoginModule {}