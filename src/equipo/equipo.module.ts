import { Module } from '@nestjs/common';
import { EquipoService } from './services/equipo.service';
import { EquipoResolver } from './resolvers/equipo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { UsersResolver } from './resolvers/users.resolver';
import { ProyectoResolver } from './resolvers/proyecto.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
    TypeOrmModule.forFeature([Equipo]),
  ],
  providers: [EquipoResolver, EquipoService, UsersResolver, ProyectoResolver],
  exports: [EquipoService],
})
export class EquipoModule {}
