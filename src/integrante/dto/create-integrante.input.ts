import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIntegranteInput {
  @Field(() => Int)
  userId: number;

  @Field()
  rol: string;

  // @Field(() => Int)
  // equipoId: number;
}
