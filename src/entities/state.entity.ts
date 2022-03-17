import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Master } from './master';
@Entity()
export class State extends Master {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  state_name: string;
  @ManyToOne(() => Country, (country) => country.state)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;
}
