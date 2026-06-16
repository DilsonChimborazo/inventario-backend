import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductosService } from './productos.service';

import { CreateProductoDto } from './dto/create-producto.dto';
import { VerificarProductoDto } from './dto/verificar-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly service: ProductosService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateProductoDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post('finalizar')
  finalizarInventario() {
    return this.service.finalizarInventario();
  }

  @Patch(':id/verificar')
  verificar(
    @Param('id') id: number,
    @Body() dto: VerificarProductoDto,
  ) {
    return this.service.verificar(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
