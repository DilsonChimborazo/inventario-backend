import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { VerificarProductoDto } from './dto/verificar-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateProductoDto) {
    const now = new Date();
    console.log('ISO:', now.toISOString());
    console.log('Hours:', now.getHours());
    console.log('Minutes:', now.getMinutes());
    console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
    const producto = this.productoRepo.create({
      nombre: dto.nombre,
      cantidadInicial: dto.cantidadInicial,
      turno: this.calcularTurno(now),
    });
    return this.productoRepo.save(producto);
  }

  findAll() {
    return this.productoRepo.find({
      order: {
        fechaRegistro: 'DESC',
      },
    });
  }

  async verificar(
    id: number,
    dto: VerificarProductoDto,
  ) {
    const producto = await this.productoRepo.findOne({
      where: { id },
    });

    if (!producto) {
      throw new NotFoundException(
        'Producto no encontrado',
      );
    }

    const fechaVerificacion = new Date();

    producto.cantidadVerificada =
      dto.cantidadVerificada;
    producto.fechaVerificacion = fechaVerificacion;
    producto.turnoVerificacion = this.calcularTurno(fechaVerificacion);

    producto.estado =
      producto.cantidadInicial ===
      dto.cantidadVerificada
        ? 'CORRECTO'
        : 'NO COINCIDE';

    return this.productoRepo.save(producto);
  }

  async finalizarInventario() {
    const productos = await this.productoRepo.find({
      order: {
        fechaRegistro: 'ASC',
      },
    });

    await this.productoRepo.clear();

    return productos;
  }

  async remove(id: number) {
    const producto = await this.productoRepo.findOne({
      where: { id },
    });

    if (!producto) {
      throw new NotFoundException(
        'Producto no encontrado',
      );
    }

    await this.productoRepo.remove(producto);

    return {
      message: 'Producto eliminado',
    };
  }

private calcularTurno(fecha: Date) {
  const bogota = new Date(
    fecha.toLocaleString('en-US', {
      timeZone: 'America/Bogota',
    }),
  );

  return bogota.getHours() < 14 ||
    (bogota.getHours() === 14 && bogota.getMinutes() < 50)
    ? 'MAÑANA'
    : 'TARDE';
}
}
