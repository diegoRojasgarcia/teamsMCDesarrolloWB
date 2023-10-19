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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
    TypeOrmModule.forFeature([Integrante]),
  ],
  providers: [IntegranteResolver, IntegranteService],
})
export class IntegranteModule {}
