import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoInput } from '../dto/create-equipo.input';
import { Users } from '../entities/user.entity';

@Resolver(() => Equipo)
export class EquipoResolver {
  constructor(private readonly equipoService: EquipoService) {}

  @Mutation(() => Equipo)
  createEquipo(
    @Args('createEquipoInput') createEquipoInput: CreateEquipoInput,
  ) {
    return this.equipoService.createEquipo(createEquipoInput);
  }

  @Query(() => [Equipo])
  getEquipos() {
    return this.equipoService.findAll();
  }

  // @Query(() => [Equipo], { name: 'equipo' })
  // findAll() {
  //   return this.equipoService.findAll();
  // }

  // @Query(() => Equipo, { name: 'equipo' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.equipoService.findOne(id);
  // }

  // @Mutation(() => Equipo)
  // updateEquipo(@Args('updateEquipoInput') updateEquipoInput: UpdateEquipoInput) {
  //   return this.equipoService.update(updateEquipoInput.id, updateEquipoInput);
  // }

  // @Mutation(() => Equipo)
  // removeEquipo(@Args('id', { type: () => Int }) id: number) {
  //   return this.equipoService.remove(id);
  // }

  @ResolveField(() => Users)
  user(@Parent() equipo: Equipo): any {
    return { __typename: 'Users', id: equipo.idAdmin };
  }
}
