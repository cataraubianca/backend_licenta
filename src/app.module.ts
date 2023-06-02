import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config'
import { SwaggerModule } from '@nestjs/swagger';
import { SheltersModule } from './shelter/shelter.module';
import { RolesModule } from './roles/roles.module';
import { PetsModule } from './pets/pets.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'licenta',
    entities: [User],
    autoLoadEntities: true,
    synchronize: true,
    
  },
  ),
  UsersModule,
  SheltersModule,
  RolesModule,
  PetsModule,
  SwaggerModule,
  LoginModule,
  MulterModule.register({
    dest: './files',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files')
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
