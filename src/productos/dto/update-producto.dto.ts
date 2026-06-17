import { IsInt, Min } from 'class-validator';

export class UpdateProductoDto {
  @IsInt()
  @Min(0)
  cantidadInicial!: number;
}