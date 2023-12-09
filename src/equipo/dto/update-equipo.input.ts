import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class updateEquipoDto {
  @Field({ nullable: true })
  nombre: string;
}
