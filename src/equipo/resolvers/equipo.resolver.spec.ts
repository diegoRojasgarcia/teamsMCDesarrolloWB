import { Test, TestingModule } from '@nestjs/testing';
import { EquipoResolver } from './equipo.resolver';
import { EquipoService } from '../services/equipo.service';

describe('EquipoResolver', () => {
  let resolver: EquipoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoResolver, EquipoService],
    }).compile();

    resolver = module.get<EquipoResolver>(EquipoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
