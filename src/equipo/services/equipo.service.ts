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

  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  async findOne(nombre: string) {
    const equipo = await this.equipoRepository.findOne({
      where: { nombre },
    });
    if (!equipo) throw new NotFoundException('Tarea not found');
    return equipo;
  }

  async findOneById(id: number) {
    const equipo = await this.equipoRepository.findOne({
      where: { id },
    });
    if (!equipo) throw new NotFoundException('Equipo not found');
    return equipo;
  }

  async update(nombreEquipo: string, updateEquipoDto: UpdateEquipoInput) {
    const equipo = await this.equipoRepository.preload({
      nombre: nombreEquipo,
      ...updateEquipoDto,
    });
    if (!equipo)
      throw new NotFoundException(
        `Equipo whit nombre: ${nombreEquipo} not found`,
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
    if (!equipo) throw new NotFoundException('Equipo not found');
    this.equipoRepository.remove(equipo);
    return equipo;
  }

  async forAdminId(userId: number) {
    const equipos = await this.equipoRepository.find();
    if (!equipos) return [];
    return equipos.filter((equipo) => equipo.idAdmin === userId);
  }
}
