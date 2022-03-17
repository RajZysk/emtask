import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Master } from './master';
import { State } from './state.entity';
@Entity()
export class Country extends Master {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  country_name: string;
  @OneToMany(() => State, (state) => state.country)
  state: State[];
}
