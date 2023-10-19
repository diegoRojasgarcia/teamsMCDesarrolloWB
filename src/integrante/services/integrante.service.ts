import { Injectable } from '@nestjs/common';
import { CreateIntegranteInput } from '../dto/create-integrante.input';
import { UpdateIntegranteInput } from '../dto/update-integrante.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Integrante } from '../entities/integrante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntegranteService {
  constructor(
    @InjectRepository(Integrante)
    private integranteRepository: Repository<Integrante>,
  ) {}

  create(createIntegranteInput: CreateIntegranteInput) {
    const newUser = this.integranteRepository.create(createIntegranteInput);
    return this.integranteRepository.save(newUser);
  }

  // findAll() {
  //   return `This action returns all integrante`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} integrante`;
  // }

  // update(id: number, updateIntegranteInput: UpdateIntegranteInput) {
  //   return `This action updates a #${id} integrante`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} integrante`;
  // }
}
