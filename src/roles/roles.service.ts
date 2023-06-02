import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async getRoleName(roleId: number): Promise<string> {
    try {
      const roleString: Roles = await this.rolesRepository.findOneOrFail({
        where: {
          id: roleId,
        },
        select: ['role'],
      });

      return roleString.role;
    } catch (err: any) {
      const error = new NotFoundException(
        `Error finding role by id=${roleId}: ${err.message}`,
      );
      console.error(error);
    }
  }

  async findAll(): Promise<Roles[]> {
    return await this.rolesRepository.find();
  }

  async create(role: Roles){
    return await this.rolesRepository.save(role);
  }
}