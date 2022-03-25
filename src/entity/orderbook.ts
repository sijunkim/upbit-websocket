import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Orderbook {
  @PrimaryGeneratedColumn("identity")
  idx!: number;

  @Column("text", { nullable: true })
  data!: string;
}
