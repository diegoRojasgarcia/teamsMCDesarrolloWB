import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Equipo } from './equipo.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Users {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Equipo])
  equipos?: Equipo[];
}
