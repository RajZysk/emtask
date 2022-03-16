import { IsActive } from 'src/service/isactive';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Master {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique:true,
    nullable:false
  })
  slug:string
  @Column()
  isActive: IsActive;
  @CreateDateColumn({
    name: 'created', type: 'timestamptz', select: false
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at', type: 'timestamptz', select: false
  })
  updatedAt: Date;
  @DeleteDateColumn({
    name: 'deleted_at', type: 'timestamptz', select: false 
  })
  deletedAt: Date;
}
