import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntegranteInput } from '../dto/create-integrante.input';
import { UpdateIntegranteInput } from '../dto/update-integrante.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Integrante } from '../entities/integrante.entity';
import { Repository } from 'typeorm';
import { EquipoService } from 'src/equipo/services/equipo.service';

@Injectable()
export class IntegranteService {
  constructor(
    @InjectRepository(Integrante)
    private integranteRepository: Repository<Integrante>,
    private readonly equipoService: EquipoService,
  ) {}

  async create(createIntegranteInput: CreateIntegranteInput) {
    const { equipoId, userId, rol } = createIntegranteInput;
    const equipoDB = await this.equipoService.findOneById(equipoId);
    if (!equipoDB) throw new NotFoundException('Equipo not found');
    const newIntegrante = this.integranteRepository.create();
    newIntegrante.userId = userId;
    newIntegrante.rol = rol;
    newIntegrante.equipoId = equipoDB.id;
    this.integranteRepository.save(newIntegrante);
    return equipoDB;
  }

  async findAll(): Promise<Integrante[]> {
    return this.integranteRepository.find();
  }

  async findIntegrantesByIdEquipo(idEquipo: number) {
    const rpintegrantes = this.findAll();
    const integrantes = (await rpintegrantes).filter(
      (integrante) => integrante.equipoId === idEquipo,
    );
    return integrantes;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} integrante`;
  // }

  // update(id: number, updateIntegranteInput: UpdateIntegranteInput) {
  //   return `This action updates a #${id} integrante`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} integrante`;
  // }

  async update(updateIntegrante: UpdateIntegranteInput) {
    const { id } = updateIntegrante;
    const integrante = await this.integranteRepository.preload({
      id: id,
      ...updateIntegrante,
    });
    if (!integrante)
      throw new NotFoundException(
        `Error en la actualizacion, intentalo nuevamente`,
      );
    try {
      await this.integranteRepository.save(integrante);
      return integrante;
    } catch (error) {
      return error;
    }
  }

  async forUserId(userId: number) {
    const integrante = await this.integranteRepository.find();
    if (!integrante) return [];
    return integrante.filter((integrante) => integrante.userId === userId);
  }
}
