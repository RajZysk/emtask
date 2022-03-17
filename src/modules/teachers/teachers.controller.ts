import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teacherService: TeachersService) {}
  @Get()
  fetchAllTeachers() {
    return this.teacherService.fetchAllTeachers();
  }
  @Get('/:slug')
  fetchTeacher(@Param('slug') slug: string) {
    return this.teacherService.fetchTeacher(slug);
  }
  @Post()
  createTeacher(@Body() res: CreateTeacherDto) {
    return this.teacherService.createTeacher(res);
  }
  @Patch('/:slug')
  updateTeacher(@Param('slug') slug: string, @Body() res: UpdateTeacherDto) {
    return this.teacherService.updateTeacher(slug, res);
  }
}
