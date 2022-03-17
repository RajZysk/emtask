import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from 'src/entities/student.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  findAllStudents() {
    return 'hello student';
  }
  findStudent(slug: string) {
    return `${slug} is to find`;
  }
  creatingStudent(res: CreateStudentDto) {
    const { studentName, DOB } = res;
    return { studentName, DOB };
  }
  updateStudent(slug: string, res: UpdateStudentDto) {
    const { studentName, DOB } = res;
    return { slug, studentName, DOB };
  }
}
