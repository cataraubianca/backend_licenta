import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shelters {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'double', nullable: false })
  geocodex: number;

  @Column({ type: 'double', nullable: false })
  geocodey: number;

  @Column({ nullable: false, length: 128 })
  name: string;

  @Column({ nullable: false, length: 128 })
  link: string;
}
