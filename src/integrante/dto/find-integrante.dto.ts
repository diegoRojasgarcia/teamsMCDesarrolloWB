import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class findIntegranteDto {
  @Field(() => Int)
  id: number;
}
