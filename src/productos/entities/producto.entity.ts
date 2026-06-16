import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  cantidadInicial!: number;

  @Column({
    nullable: true,
  })
  cantidadVerificada!: number;

  @Column({
    nullable: true,
  })
  fechaVerificacion!: Date;

  @Column({
    nullable: true,
  })
  turnoVerificacion!: string;

  @CreateDateColumn()
  fechaRegistro!: Date;

  @Column()
  turno!: string;

  @Column({
    default: 'PENDIENTE',
  })
  estado!: string;
}
