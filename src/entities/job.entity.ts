import { Entity, Column } from 'typeorm';
import BaseEntity from './base.entity';

@Entity('jobs')
export class Job extends BaseEntity {
   @Column({
      unique: true,
   })
   title: string;

   @Column()
   description: string;

   @Column()
   expiry: Date;
}
