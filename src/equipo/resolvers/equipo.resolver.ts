import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoInput } from '../dto/create-equipo.input';
import { Users } from '../entities/user.entity';
import { UpdateEquipoInput } from '../dto/update-equipo.input';
import { Proyecto } from '../entities/proyecto.entity';
import { getEquipoInput } from '../dto/getEquipo';
import { Integrante } from 'src/integrante/entities/integrante.entity';

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

  @Query(() => Equipo, { name: 'equipo' })
  findOneByNombre(@Args('nombre', { type: () => String }) nombre: string) {
    return this.equipoService.findOneByName(nombre);
  }

  @Query(() => [Equipo])
  getEquiposbyProyectId(@Args('id', { type: () => Int }) id: number) {
    return this.equipoService.findEquiposByIdProyecto(id);
  }

  @Query(() => [Integrante])
  getIntegrantebyIdEquipo(@Args('id', { type: () => Int }) id: number) {
    return this.equipoService.findIntegrantesByIdEquipo(id);
  }

  @Query(() => [Equipo])
  getEquiposbyIdProyectoName(
    @Args('getEquipoInput') getEquipoInput: getEquipoInput,
  ) {
    return this.equipoService.findEquipo(getEquipoInput);
  }

  @Mutation(() => Equipo)
  updateEquipo(
    @Args('updateEquipoInput') updateEquipoInput: UpdateEquipoInput,
  ) {
    return this.equipoService.update(updateEquipoInput);
  }

  @Mutation(() => Equipo)
  removeEquipo(@Args('id', { type: () => Int }) id: number) {
    return this.equipoService.remove(id);
  }

  @ResolveField(() => Users)
  user(@Parent() equipo: Equipo): any {
    return { __typename: 'Users', id: equipo.idAdmin };
  }

  @ResolveField(() => Proyecto)
  proyecto(@Parent() equipo: Equipo): any {
    return { __typename: 'Proyecto', id: equipo.idProyecto };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.equipoService.findOneById(reference.id);
  }
}
