import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity({
  name: 'Student_Teacher',
})
export class StudentTeacher {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Student, (student) => student.std_teach)
  @JoinColumn({
    name: 'student_id',
  })
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.std_teach)
  @JoinColumn({
    name: 'teacher_id',
  })
  teacher: Teacher;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    select: false,
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    select: false,
  })
  updatedAt: Date;
}
