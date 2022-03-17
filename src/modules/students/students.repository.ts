import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from 'src/entities/student.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { StudentTeacher } from 'src/entities/student_teacher.entity';
import { Teacher } from 'src/entities/teacher.entity';
@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  /**
   * Constructor: StudentRepository
   * @param StudentRepository Branch repository
   */
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super();
  }

  findAllStudents() {
    try {
      return this.studentRepository.createQueryBuilder().getMany();
    } catch (error) {
      console.log(error);
    }
  }
  findStudent(slug: string) {
    try {
      const student = this.studentRepository
        .createQueryBuilder()
        .where({ slug })
        .getOne();
      if (!student) {
        return { mes: 'student does not exists' };
      }
      return student;
    } catch (error) {
      return { mes: 'error in getting student by slug' };
    }
  }
  async creatingStudent(res: CreateStudentDto) {
    const { studentName, DOB, teachers } = res;
    try {
      return this.studentRepository
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values({
          studentName,
          DOB,
          slug: uuid(),
        })
        .execute()
        .then(async () => {
          teachers.map(async (teacher) => {
            const student = await this.studentRepository
              .createQueryBuilder('students')
              .where('students.studentName=:name', { name: studentName })
              .getOne();
            const teacherid = await getRepository(Teacher)
              .createQueryBuilder('teachers')
              .where('teachers.teacherName=:name', { name: teacher })
              .getOne();
            this.studentRepository
              .createQueryBuilder()
              .insert()
              .into(StudentTeacher)
              .values({
                teacher: teacherid.id as any,
                student: student.id as any,
              })
              .execute();
          });
        })
        .then(() => 'successfully created');
    } catch (error) {
      console.log(error);
    }
  }
  async updateStudent(slug: string, res: UpdateStudentDto) {
    try {
      const { studentName, DOB } = res;
      const student = await this.findStudent(slug);
      if (student) {
        const result = await this.studentRepository
          .createQueryBuilder()
          .where('slug = :slug', { slug })
          .update()
          .set({ studentName, DOB })
          .execute();
        if (result.affected === 0) {
          return { mes: 'please enter a valid id' };
        } else return { mes: `${studentName} updated successfully` };
      } else return { mes: 'student not found' };
    } catch (error) {
      return { mes: 'error in updating student' };
    }
  }
}
