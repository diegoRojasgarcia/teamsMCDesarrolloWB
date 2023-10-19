import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Users } from 'src/equipo/entities/user.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Integrante {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  // @Field(() => Int)
  // userId: number;

  // @Field(() => Users)
  // user: Users;

  // @Field(() => Int)
  // equipoId: number;

  // @Field(() => Equipo)
  // equipo: Equipo;

  @Field(() => Int)
  rol: string;
}
