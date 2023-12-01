import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIntegranteInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  equipoId: number;

  @Field(() => Int)
  idProyecto: number;

  @Field()
  rol: string;
}
