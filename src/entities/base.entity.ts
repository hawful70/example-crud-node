import {
   BaseEntity,
   BeforeInsert,
   BeforeUpdate,
   CreateDateColumn,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

export default abstract class Base extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn({ nullable: true }) // Allow null values
   updated_at: Date | null;

   @BeforeInsert()
   setCreatedAt() {
      this.updated_at = null; // Set to null on creation
   }

   @BeforeUpdate()
   setUpdatedAt() {
      this.updated_at = new Date();
   }
}
