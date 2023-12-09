import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class findEquipoByIdDto {
  @Field(() => Int)
  id: number;
}
