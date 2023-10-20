import { Module } from '@nestjs/common';
import { IntegranteService } from './services/integrante.service';
import { IntegranteResolver } from './resolvers/integrante.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { EquipoModule } from 'src/equipo/equipo.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
    TypeOrmModule.forFeature([Integrante]),
    EquipoModule,
  ],
  providers: [IntegranteResolver, IntegranteService],
})
export class IntegranteModule {}
