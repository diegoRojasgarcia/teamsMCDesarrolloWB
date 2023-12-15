import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Users } from '../entities/user.entity';
import { EquipoService } from '../services/equipo.service';
import { Equipo } from '../entities/equipo.entity';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly equipoService: EquipoService) {}

  @ResolveField(() => [Equipo])
  equipos(@Parent() user: Users): Promise<Equipo[]> {
    return this.equipoService.forAdminId(user.id);
  }
}
