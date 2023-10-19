import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEquipoInput {
  @Field()
  nombre: string;
}
