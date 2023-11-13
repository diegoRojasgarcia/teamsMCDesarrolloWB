import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEquipoInput {
  @Field(() => Int)
  id: number;

  @Field()
  nombre: string;
}
