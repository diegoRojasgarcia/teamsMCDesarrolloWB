import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoInput } from '../dto/create-equipo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from '../entities/equipo.entity';
import { UpdateEquipoInput } from '../dto/update-equipo.input';

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

  async findOneByName(nombre: string) {
    const equipo = await this.equipoRepository.findOne({
      where: { nombre },
    });
    if (!equipo) throw new NotFoundException('Equipo not found');
    return equipo;
  }

  async findOneById(id: number) {
    const equipo = await this.equipoRepository.findOne({
      where: { id },
    });
    if (!equipo) throw new NotFoundException('Equipo not found');
    return equipo;
  }

  async update(updateEquipoDto: UpdateEquipoInput) {
    const { id } = updateEquipoDto;
    const equipo = await this.equipoRepository.preload({
      id: id,
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

  async remove(id: number) {
    const equipo = await this.findOneById(id);
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
}
