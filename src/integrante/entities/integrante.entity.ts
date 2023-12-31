import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Users } from 'src/equipo/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Integrante {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Field(() => Users)
  user: Users;

  @Column()
  @Field()
  rol: string;

  @Column()
  @Field(() => Int)
  equipoId: number;

  @ManyToOne(() => Equipo, (equipo) => equipo.integrantes, {
    onDelete: 'CASCADE',
  })
  @Field(() => Equipo)
  equipo: Equipo;

  @Column()
  @Field(() => Int)
  idProyecto: number;
}
