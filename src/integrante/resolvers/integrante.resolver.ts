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
import { findIntegranteDto } from '../dto/find-integrante.dto';

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

  @Query(() => [Integrante])
  getIntegrantebyIdUsuario(@Args('id', { type: () => Int }) id: number) {
    return this.integranteService.findIntegrantesByIdUsuario(id);
  }

  @Query(() => [Integrante])
  findIntegrantes() {
    return this.integranteService.findAll();
  }

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

  @Mutation(() => Integrante)
  removeIntegrante(
    @Args('findIntegranteDto') findIntegranteByIdDto: findIntegranteDto,
  ): Promise<Integrante> {
    return this.integranteService.remove(findIntegranteByIdDto);
  }

  @ResolveField(() => Users)
  user(@Parent() integrante: Integrante): any {
    return { __typename: 'Users', id: integrante.userId };
  }
}
