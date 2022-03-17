import { Teacher } from 'src/entities/teacher.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
@EntityRepository(Teacher)
export class TeachersRepository extends Repository<Teacher> {
  fetchAllTeachers() {
    return 'hello teacher';
  }
  fetchTeacher(slug: string) {
    return slug;
  }
  createTeacher(res: CreateTeacherDto) {
    const { teacherName } = res;
    return teacherName;
  }
  updateTeacher(res: UpdateTeacherDto, slug: string) {
    const { teacherName } = res;
    return { teacherName, slug };
  }
}
