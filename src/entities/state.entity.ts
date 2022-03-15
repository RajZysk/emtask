import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from './country.entity';
import { Master } from './master';
@Entity()
export class State extends Master {
  @Column()
  state_name: string;
  @ManyToOne(() => Country, (country) => country.state)
  @JoinColumn()
  country: Country;
}
