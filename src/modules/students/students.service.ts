import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository as StudentRepository } from './students.repository';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(protected studentRepository: StudentRepository) {}
  findAllStudents(search: any) {
    return this.studentRepository.findAllStudents(search);
  }
  findStudent(slug: string) {
    return this.studentRepository.findStudent(slug);
  }
  creatingStudent(res: CreateStudentDto) {
    return this.studentRepository.creatingStudent(res);
  }
  updateStudent(slug: string, res: UpdateStudentDto) {
    return this.studentRepository.updateStudent(slug, res);
  }
}
