import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEquipoInput {
  @Field()
  id: number;

  @Field()
  nombre: string;
}
