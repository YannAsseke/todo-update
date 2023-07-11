import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column()
  readonly description: string;

  @Column({default : false})
  readonly status: boolean;
}