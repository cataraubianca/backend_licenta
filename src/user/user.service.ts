import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class UserService {
  private readonly safeSelect= {
    password: false,
    password_recovery: false,
    sal: false
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }


  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  update(id: number, user: User) {
    this.usersRepository.update(id, user);
  }

  /**
   * Finds a user's role from his/hers email
   * @param userId
   * @returns string representing user's role
   */
  async findUsersRoleById(id: number): Promise<string> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
        select: ['roleId'],
      });
      return this.rolesService.getRoleName(user.roleId);
    } catch (err) {
      return null;
    }
  }

  async updateName(id: number, text:string) {
    const pet = this.findUserById(id);
    (await pet).full_name = text
    await this.usersRepository.save(await pet);
    return pet
  }
  
  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
      });
      return user;
    } catch (err) {
      return null;
    }
  }

  /**
   * Finds an user by the email
   * @param email
   * @returns user
   */
  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { email: email },
        select: this.safeSelect,
      });

      return user;
    } catch (err) {
      return null;
    }
  }
  
  /**
   * Finds an user by the unique id
   * @param id
   * @returns user
   */
  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
        select: this.safeSelect,
      });
  
      return user;
    } catch (err) {
      return null;
    }
  }
  

  async addPetToUser(userId: number, petId: number) {
    const user = await this.findUserById(userId);
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
  
    user.petsIds = user.petsIds || []; // Ensure petsIds array exists
    user.petsIds.push(petId);
    await this.usersRepository.save(user);
  
    return user;
  }
  
  async removeFromFavorites(userId: number, petId: number) {
    const user = await this.findUserById(userId);
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
  
    user.favorites = user.favorites || []; // Ensure petsIds array exists
  
    user.favorites = user.favorites.filter((id) => id !== petId && id !== null);
  
    await this.usersRepository.save(user);
  
    return user;
  }
  
  async addFavoriteToUser(userId: number, petId: number) {
    const user = await this.findUserById(userId);
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
  
    user.favorites = user.favorites || []; // Ensure petsIds array exists
    user.favorites.push(petId);
    await this.usersRepository.save(user);
  
    return user;
  }
  async create(user: User){
    await this.usersRepository.save(user);
  }
  /**
   * Create new user
   * @param email Estee Lauder email
   * @param password clear string password
   * @returns new user object
   */
  async insertUser(
    user: User
  ): Promise<User> {
    try {
        const testUser = await this.findUserByEmail(user.email);

        if (!testUser) {
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(user.password, salt);

          const newUser = await this.usersRepository.create({
            email: user.email,
            password: hash,
            salt,
            full_name: user.full_name,
            roleId: 2
          });

          const insertedUser = await this.usersRepository.save(newUser);

          //if (full_name) {
          //  await this.updateUser(insertedUser.id, { full_name });
          //}

          return insertedUser;
        } else {
          throw new HttpException('User already exists.', HttpStatus.CONFLICT);
        }
      
    } catch (err) {
      //const error = `Error creating new user: ${err.message}`;
      //this.logger.error(error);
      console.error(err);
    }
  }
}   