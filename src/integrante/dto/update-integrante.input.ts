import { CreateIntegranteInput } from './create-integrante.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIntegranteInput extends PartialType(CreateIntegranteInput) {
  @Field()
  id: number;

  @Field()
  rol: string;
}
