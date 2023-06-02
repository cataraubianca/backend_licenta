import {
    Entity,
    Index,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'

import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.entity';
import { Pets } from 'src/pets/pets.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    

    @Column({
        length: 128,
        nullable: false,
    })
    full_name: string

    @Index({
        unique: true,
    })
    @Column({ length: 128 })
    email: string

    @Column({ length: 128 })
    password: string

    @Column({ length: 128 })
    salt: string

    @Column({ default: false })
    is_active: boolean

    @Column({
        length: 255,
        nullable: true,
    })
    password_recovery: string;

    @Column({ nullable:true })
    roleId: number;

    @ManyToOne(() => Roles, {
        cascade: true,
    })
    @JoinColumn()
    role: Roles;

    @Column({
        nullable: true,
        type:'json',
    })
    petsIds: number[];

    @OneToMany(() => Pets, (pet) => pet.id )
    pets: Pets[]


    @Column({
        nullable: true,
        type:'json',
    })
    favorites: number[];


}