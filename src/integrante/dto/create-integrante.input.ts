import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIntegranteInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  equipoId: number;

  @Field()
  rol: string;
}
