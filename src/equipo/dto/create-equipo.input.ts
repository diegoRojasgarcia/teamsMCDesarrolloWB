import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEquipoInput {
  @Field()
  nombre: string;

  @Field()
  idAdmin: number;
}
