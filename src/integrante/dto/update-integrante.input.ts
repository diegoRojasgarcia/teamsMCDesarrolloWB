import { CreateIntegranteInput } from './create-integrante.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIntegranteInput extends PartialType(CreateIntegranteInput) {
  @Field(() => Int)
  id: number;
}
