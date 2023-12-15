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
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Integrante)
export class IntegranteResolver {
  constructor(private readonly integranteService: IntegranteService) {}

  @Mutation(() => Integrante)
  createIntegrante(
    @Args('createIntegranteInput') createIntegranteInput: CreateIntegranteInput,
  ): Promise<Integrante> {
    try {
      return this.integranteService.create(createIntegranteInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Integrante])
  getIntegrantesbyIdEquipo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Integrante[]> {
    try {
      return this.integranteService.findIntegrantesByIdEquipo(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Integrante])
  getIntegrantebyIdUsuario(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Integrante[]> {
    try {
      return this.integranteService.findIntegrantesByIdUsuario(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Integrante])
  findIntegrantes(): Promise<Integrante[]> {
    try {
      return this.integranteService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => Integrante)
  getIntegrantebyId(
    @Args('getIntegrantebyId') data: findIntegranteDto,
  ): Promise<Integrante> {
    try {
      return this.integranteService.findOneById(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Integrante)
  updateIntegrante(
    @Args('updateIntegranteInput') updateIntegranteInput: UpdateIntegranteInput,
  ): Promise<Integrante> {
    try {
      return this.integranteService.update(updateIntegranteInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Integrante)
  removeIntegrante(
    @Args('findIntegranteDto') findIntegranteByIdDto: findIntegranteDto,
  ): Promise<Integrante> {
    try {
      return this.integranteService.remove(findIntegranteByIdDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ResolveField(() => Users)
  user(@Parent() integrante: Integrante): any {
    return { __typename: 'Users', id: integrante.userId };
  }
}
