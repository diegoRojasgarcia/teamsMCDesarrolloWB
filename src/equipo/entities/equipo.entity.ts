import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Equipo {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  nombre: string;

  @Column()
  @Field()
  idAdmin: number;

  @Field(() => Users)
  user?: Users;
}
