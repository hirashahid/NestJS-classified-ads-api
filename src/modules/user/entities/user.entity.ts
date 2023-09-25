import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserInterface } from '../interfaces/user.interface';
import { GeneratorProvider } from 'src/providers/generator.provider';
import { Gender, RoleType, UserType } from '../constants/user';
import { IsEmail } from 'class-validator';

@Entity({ name: 'users' })
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 145 })
  uuid: string;

  @Column({ type: 'varchar', length: 145 })
  name: string;

  @Column({ type: 'varchar', length: 145 })
  @IsEmail({}, { message: 'Invalid email format' }) // Apply email validation with a regex pattern
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'varchar', length: 145, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  salt: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  generateUUID() {
    this.uuid = GeneratorProvider.uuid();
  }
}
