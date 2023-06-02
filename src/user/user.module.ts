import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesModule } from 'src/roles/roles.module';
import { LoginService } from 'src/login/login.service';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, Logger]
})
export class UsersModule {}