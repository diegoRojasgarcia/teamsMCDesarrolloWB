import { Test, TestingModule } from '@nestjs/testing';
import { IntegranteResolver } from './integrante.resolver';
import { IntegranteService } from '../services/integrante.service';

describe('IntegranteResolver', () => {
  let resolver: IntegranteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegranteResolver, IntegranteService],
    }).compile();

    resolver = module.get<IntegranteResolver>(IntegranteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
