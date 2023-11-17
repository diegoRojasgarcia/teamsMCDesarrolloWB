import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class getEquipoInput {
  @Field(() => Int)
  idProyecto: number;

  @Field()
  nombre: string;
}
