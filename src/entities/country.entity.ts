import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Master } from './master';
import { State } from './state.entity';
@Entity()
export class Country extends Master {
  @Column()
  country_name: string;
@ManyToMany(()=>State, state=>state.country)
state : State[]
}
