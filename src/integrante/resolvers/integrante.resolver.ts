import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
  Int,
} from '@nestjs/graphql';
import { IntegranteService } from '../services/integrante.service';
import { Integrante } from '../entities/integrante.entity';
import { CreateIntegranteInput } from '../dto/create-integrante.input';
import { UpdateIntegranteInput } from '../dto/update-integrante.input';
import { Users } from '../entities/user.entity';

@Resolver(() => Integrante)
export class IntegranteResolver {
  constructor(private readonly integranteService: IntegranteService) {}

  @Mutation(() => Integrante)
  createIntegrante(
    @Args('createIntegranteInput') createIntegranteInput: CreateIntegranteInput,
  ) {
    return this.integranteService.create(createIntegranteInput);
  }

  @Query(() => [Integrante])
  getIntegrantesbyIdEquipo(@Args('id', { type: () => Int }) id: number) {
    return this.integranteService.findIntegrantesByIdEquipo(id);
  }

  // @Query(() => [Integrante], { name: 'integrante' })
  // findAll() {
  //   return this.integranteService.findAll();
  // }

  // @Query(() => Integrante, { name: 'integrante' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.integranteService.findOne(id);
  // }

  @Mutation(() => Integrante)
  updateIntegrante(
    @Args('updateIntegranteInput') updateIntegranteInput: UpdateIntegranteInput,
  ) {
    return this.integranteService.update(updateIntegranteInput);
  }

  // @Mutation(() => Integrante)
  // removeIntegrante(@Args('id', { type: () => Int }) id: number) {
  //   return this.integranteService.remove(id);
  // }

  @ResolveField(() => Users)
  user(@Parent() integrante: Integrante): any {
    return { __typename: 'Users', id: integrante.userId };
  }
}
