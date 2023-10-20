import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Users } from '../entities/user.entity';
import { IntegranteService } from '../services/integrante.service';
import { Integrante } from '../entities/integrante.entity';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly integranteService: IntegranteService) {}

  @ResolveField(() => [Integrante])
  equipos(@Parent() user: Users) {
    return this.integranteService.forUserId(user.id);
  }
}
