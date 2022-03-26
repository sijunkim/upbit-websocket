import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Orderbook {
  @PrimaryGeneratedColumn()
  public idx: number;

  @Column("text")
  public code: string;

  @Column("text")
  public data: string;
}
