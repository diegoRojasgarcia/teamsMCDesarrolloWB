import { Test, TestingModule } from '@nestjs/testing';
import { IntegranteService } from './integrante.service';

describe('IntegranteService', () => {
  let service: IntegranteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegranteService],
    }).compile();

    service = module.get<IntegranteService>(IntegranteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
