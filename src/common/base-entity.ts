import { Env } from 'src/env';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Databases } from './constants';

/// Base class for database entities
export class Base {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @CreateDateColumn({
    type: Env.DATABASE.TYPE === Databases.SQLITE ? 'datetime' : 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: Env.DATABASE.TYPE === Databases.SQLITE ? 'datetime' : 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: Env.DATABASE.TYPE === Databases.SQLITE ? 'datetime' : 'timestamp',
  })
  deletedAt: Date;
}
