import { StudentRepository } from './../students/students.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { v4 as uuid } from 'uuid';
import { StudentTeacher } from 'src/entities/student_teacher.entity';
import { Student } from 'src/entities/student.entity';

@EntityRepository(Teacher)
export class TeachersRepository extends Repository<Teacher> {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {
    super();
  }
  fetchAllTeachers() {
    try {
      return this.teachersRepository.createQueryBuilder().getMany();
    } catch (error) {
      console.log(error);
    }
  }
  fetchTeacher(slug: string) {
    try {
      const teacher = this.teachersRepository
        .createQueryBuilder()
        .where({ slug })
        .getOne();
      if (!teacher) {
        return { mes: 'teacher does not exists' };
      }
      return teacher;
    } catch (error) {
      return { mes: 'error in getting teacher by slug' };
    }
  }
  async createTeacher(res: CreateTeacherDto) {
    const { teacherName, students } = res;
    try {
      return this.teachersRepository
        .createQueryBuilder()
        .insert()
        .into(Teacher)
        .values({
          teacherName,
          slug: uuid(),
        })
        .execute()
        .then(async () => {
          students.map(async (student) => {
            const teacher = await this.teachersRepository
              .createQueryBuilder('teachers')
              .where('teachers.teacherName=:name', { name: teacherName })
              .getOne();
            const studentid = await getRepository(Student)
              .createQueryBuilder('students')
              .where('students.studentName=:name', { name: student })
              .getOne();
            console.log(teacher);
            this.teachersRepository
              .createQueryBuilder()
              .insert()
              .into(StudentTeacher)
              .values({
                teacher: teacher.id as any,
                student: studentid.id as any,
              })
              .execute();
          });
        })
        .then(() => 'successfully created');
    } catch (error) {
      console.log(error);
    }
  }
  async updateTeacher(slug: string, res: UpdateTeacherDto) {
    try {
      const { teacherName } = res;
      const student = await this.fetchTeacher(slug);
      if (student) {
        const result = await this.teachersRepository
          .createQueryBuilder()
          .where('slug = :slug', { slug })
          .update()
          .set({ teacherName })
          .execute();
        if (result.affected === 0) {
          return { mes: 'please enter a valid id' };
        } else return { mes: `${teacherName} updated successfully` };
      } else return { mes: 'student not found' };
    } catch (error) {
      return { mes: 'error in updating student' };
    }
  }
}
