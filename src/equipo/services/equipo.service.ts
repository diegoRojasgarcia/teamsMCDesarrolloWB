import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoInput } from '../dto/create-equipo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { getEquipoInput } from '../dto/getEquipo';
import { findEquipoByIdDto } from '../dto/findEquipoById';
import { updateEquipoDto } from '../dto/update-equipo.input';
import { Integrante } from 'src/integrante/entities/integrante.entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

  async createEquipo(createEquipoInput: CreateEquipoInput): Promise<Equipo> {
    const newUser = this.equipoRepository.create(createEquipoInput);
    return this.equipoRepository.save(newUser);
  }

  async saveEquipo(equipo: Equipo): Promise<Equipo> {
    return this.equipoRepository.save(equipo);
  }

  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  async findOneByName(nombre: string): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({
      where: { nombre },
    });
    if (!equipo) throw new NotFoundException('Equipo not found');
    return equipo;
  }

  async findEquiposByIdProyecto(id: number): Promise<Equipo[]> {
    const equipos = this.findAll();
    const equiposbyProyecto = (await equipos).filter(
      (equipo) => equipo.idProyecto === id,
    );
    if (!equiposbyProyecto) return [];
    return equiposbyProyecto;
  }

  async findOneById(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({
      where: { id },
      relations: ['integrantes'],
    });
    if (!equipo) throw new NotFoundException('Equipo not found');
    return equipo;
  }

  async update(
    findProyectoByIdDto: findEquipoByIdDto,
    updateEquipoDto: updateEquipoDto,
  ): Promise<Equipo> {
    const equipo = await this.equipoRepository.preload({
      id: findProyectoByIdDto.id,
      ...updateEquipoDto,
    });
    if (!equipo)
      throw new NotFoundException(
        `Error en la actualizacion, intentalo nuevamente`,
      );
    try {
      await this.equipoRepository.save(equipo);
      return equipo;
    } catch (error) {
      return error;
    }
  }

  async remove(findEquipoByIdDto: findEquipoByIdDto): Promise<Equipo> {
    const equipo = await this.findOneById(findEquipoByIdDto.id);
    if (!equipo)
      throw new NotFoundException(
        'Error al eliminar el equipo, intentalo nuevamente.',
      );
    this.equipoRepository.remove(equipo);
    return equipo;
  }

  async forAdminId(userId: number) {
    const equipos = await this.equipoRepository.find();
    if (!equipos) return [];
    return equipos.filter((equipo) => equipo.idAdmin === userId);
  }

  async forProyectoId(proyectoId: number) {
    const equipos = await this.equipoRepository.find();
    if (!equipos) return [];
    return equipos.filter((equipos) => equipos.idProyecto === proyectoId);
  }

  async findEquipo({ idProyecto, nombre }: getEquipoInput): Promise<Equipo[]> {
    return this.equipoRepository.find({
      where: {
        nombre: Like(`%${nombre}%`),
        idProyecto: idProyecto,
      },
    });
  }

  async findIntegrantesByIdEquipo(idEquipo: number): Promise<Integrante[]> {
    const equipo = this.findOneById(idEquipo);
    const integrantes = (await equipo).integrantes;
    return integrantes;
  }
}
