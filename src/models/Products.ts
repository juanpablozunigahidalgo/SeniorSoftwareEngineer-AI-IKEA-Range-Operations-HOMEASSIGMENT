import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsInt, Min } from "class-validator";

@Entity()
export class Product {
  
  @PrimaryGeneratedColumn("uuid") // Cumple Req: id (String/Unique)
  id: string;

  @Column() // Cumple Req: name (Required)
  name: string;

  @Column({ unique: true }) // Cumple Req: sku (Required & Unique)
  sku: string;

  @Column({ default: 0 }) // Cumple Req: stock (Defaults to 0)
  @IsInt()
  @Min(0) // Validación extra: El stock nunca debería bajar de 0 en la DB
  stock: number;

  @CreateDateColumn() // Cumple Req: createdAt
  createdAt: Date;

  @UpdateDateColumn() // Cumple Req: updatedAt
  updatedAt: Date;
}