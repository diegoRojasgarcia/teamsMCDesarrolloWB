import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateEquipoInput {
  @Field()
  nombre: string;

  @Field(() => Int)
  idAdmin: number;

  @Field(() => Int)
  idProyecto: number;
}
