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
import { Proyecto } from '../entities/proyecto.entity';
import { getEquipoInput } from '../dto/getEquipo';
import { Integrante } from 'src/integrante/entities/integrante.entity';
import { findEquipoByIdDto } from '../dto/findEquipoById';
import { updateEquipoDto } from '../dto/update-equipo.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Equipo)
export class EquipoResolver {
  constructor(private readonly equipoService: EquipoService) {}

  @Mutation(() => Equipo)
  createEquipo(
    @Args('createEquipoInput') createEquipoInput: CreateEquipoInput,
  ): Promise<Equipo> {
    try {
      return this.equipoService.createEquipo(createEquipoInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Equipo])
  getEquipos(): Promise<Equipo[]> {
    try {
      return this.equipoService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => Equipo, { name: 'equipo' })
  findOneByNombre(
    @Args('nombre', { type: () => String }) nombre: string,
  ): Promise<Equipo> {
    try {
      return this.equipoService.findOneByName(nombre);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Equipo])
  getEquiposbyProyectId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Equipo[]> {
    try {
      return this.equipoService.findEquiposByIdProyecto(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Integrante])
  getIntegrantebyIdEquipo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Integrante[]> {
    try {
      return this.equipoService.findIntegrantesByIdEquipo(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Equipo])
  getEquiposbyIdProyectoName(
    @Args('getEquipoInput') getEquipoInput: getEquipoInput,
  ): Promise<Equipo[]> {
    try {
      return this.equipoService.findEquipo(getEquipoInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Equipo)
  updateEquipo(
    @Args('findEquipoByIdInput') findEquipoByIdDto: findEquipoByIdDto,
    @Args('updateEquipoInput') updateEquipoDto: updateEquipoDto,
  ): Promise<Equipo> {
    try {
      return this.equipoService.update(findEquipoByIdDto, updateEquipoDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // @Mutation(() => Equipo)
  // removeEquipo(@Args('id', { type: () => Int }) id: number) {
  //   return this.equipoService.remove(id);
  // }

  @Mutation(() => Equipo)
  removeEquipo(
    @Args('findEquipoByIdInput') findEquipoByIdDto: findEquipoByIdDto,
  ): Promise<Equipo> {
    try {
      return this.equipoService.remove(findEquipoByIdDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
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
