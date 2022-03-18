import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersRepository } from './teachers.repository';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeachersRepository)
    private teachersRepo: TeachersRepository,
  ) {}
  fetchAllTeachers(search: any) {
    return this.teachersRepo.fetchAllTeachers(search);
  }
  fetchTeacher(slug: string) {
    return this.teachersRepo.fetchTeacher(slug);
  }
  createTeacher(res: CreateTeacherDto) {
    return this.teachersRepo.createTeacher(res);
  }
  updateTeacher(slug: string, res: UpdateTeacherDto) {
    return this.teachersRepo.updateTeacher(slug, res);
  }
}
