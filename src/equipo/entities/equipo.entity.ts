import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Integrante } from 'src/integrante/entities/integrante.entity';

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

  @OneToMany(() => Integrante, (integrante) => integrante.equipo, {
    eager: true,
  })
  @Field(() => [Integrante])
  integrantes?: Integrante[];
}
