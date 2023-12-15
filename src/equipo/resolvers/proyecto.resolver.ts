import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EquipoService } from '../services/equipo.service';
import { Proyecto } from '../entities/proyecto.entity';
import { Equipo } from '../entities/equipo.entity';

@Resolver(() => Proyecto)
export class ProyectoResolver {
  constructor(private readonly equipoService: EquipoService) {}

  @ResolveField(() => [Equipo])
  equipos(@Parent() proyecto: Proyecto): Promise<Equipo[]> {
    return this.equipoService.forProyectoId(proyecto.id);
  }
}
