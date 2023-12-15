import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntegranteInput } from '../dto/create-integrante.input';
import { UpdateIntegranteInput } from '../dto/update-integrante.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Integrante } from '../entities/integrante.entity';
import { Repository } from 'typeorm';
import { EquipoService } from 'src/equipo/services/equipo.service';
import { findIntegranteDto } from '../dto/find-integrante.dto';

@Injectable()
export class IntegranteService {
  constructor(
    @InjectRepository(Integrante)
    private integranteRepository: Repository<Integrante>,
    private readonly equipoService: EquipoService,
  ) {}

  async create(
    createIntegranteInput: CreateIntegranteInput,
  ): Promise<Integrante> {
    const { equipoId, userId, rol, idProyecto } = createIntegranteInput;
    const equipoDB = await this.equipoService.findOneById(equipoId);
    if (!equipoDB) throw new NotFoundException('Equipo not found');
    const newIntegrante = this.integranteRepository.create();
    newIntegrante.userId = userId;
    newIntegrante.rol = rol;
    newIntegrante.equipoId = equipoDB.id;
    newIntegrante.idProyecto = idProyecto;
    const createIntegrante = this.integranteRepository.save(newIntegrante);
    return createIntegrante;
  }

  async findAll(): Promise<Integrante[]> {
    return this.integranteRepository.find();
  }

  async findIntegrantesByIdEquipo(idEquipo: number): Promise<Integrante[]> {
    const rpintegrantes = this.findAll();
    const integrantes = (await rpintegrantes).filter(
      (integrante) => integrante.equipoId === idEquipo,
    );
    return integrantes;
  }

  async findIntegrantesByIdUsuario(idusuario: number): Promise<Integrante[]> {
    return this.integranteRepository.find({ where: { userId: idusuario } });
  }

  async findOneById(findIntegranteByIdDto): Promise<Integrante> {
    const { id } = findIntegranteByIdDto;
    const IntegranteDB = await this.integranteRepository.findOne({
      where: { id },
    });
    if (!IntegranteDB) throw new NotFoundException('Integrante not found');
    return IntegranteDB;
  }

  async remove(findIntegranteByIdDto: findIntegranteDto): Promise<Integrante> {
    const integranteDB = await this.findOneById(findIntegranteByIdDto);
    if (!integranteDB)
      throw new NotFoundException(
        'Error al eliminar la tarea, intentalo nuevamente.',
      );
    try {
      this.integranteRepository.remove(integranteDB);
      return integranteDB;
    } catch (error) {
      return error;
    }
  }

  async update(updateIntegrante: UpdateIntegranteInput): Promise<Integrante> {
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
