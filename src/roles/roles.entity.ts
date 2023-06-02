import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    REGULAR = "regular"
}

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.REGULAR,
    })
    role: UserRole
}