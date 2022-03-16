import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Country } from './country.entity';
import { Master } from './master';
@Entity()
export class State extends Master {
  @Column()
  state_name: string;
@ManyToMany(()=>Country, country=>country.state)
@JoinTable({
  name:"country_state",
  joinColumn:{
    name: "state_id",
    referencedColumnName:"id"
  },
  inverseJoinColumn:{
    name:"country_id",
    referencedColumnName:"id"
  }
})
country:Country[]
}
